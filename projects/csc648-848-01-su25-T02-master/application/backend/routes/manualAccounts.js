// ==============================================
// MANUAL ACCOUNTS BACKEND ROUTE
// ==============================================

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const [rows] = await req.db.execute(
      `SELECT manualAccountId, accountType, accountName, createdAt 
       FROM ManualAccount WHERE userId = ?`, [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch manual accounts:', err);
    res.status(500).json({ error: 'Failed to fetch manual accounts' });
  }
});

// POST create a new manual account for current user
router.post('/', async (req, res) => {
  const userId = req.session.userId;
  const { accountType, accountName } = req.body;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });
  if (!accountType || !accountName) return res.status(400).json({ error: 'Missing fields' });

  try {
    const [result] = await req.db.execute(
      `INSERT INTO ManualAccount (userId, accountType, accountName) VALUES (?, ?, ?)`,
      [userId, accountType, accountName]
    );
    res.status(201).json({ manualAccountId: result.insertId, accountType, accountName });
  } catch (err) {
    console.error('Failed to create manual account:', err);
    res.status(500).json({ error: 'Failed to create manual account' });
  }
});

// DELETE a manual account
router.delete('/:manualAccountId', async (req, res) => {
  const userId = req.session.userId;
  const { manualAccountId } = req.params;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const [result] = await req.db.execute(
      `DELETE FROM ManualAccount WHERE manualAccountId = ? AND userId = ?`,
      [manualAccountId, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Manual account not found' });
    }
    res.json({ message: 'Manual account deleted' });
  } catch (err) {
    console.error('Failed to delete manual account:', err);
    res.status(500).json({ error: 'Failed to delete manual account' });
  }
});

module.exports = router;