// ==============================================
// MANUAL TRANSACTIONS BACKEND ROUTE
// ==============================================

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
  const userId = req.session.userId;
  console.log('GET /all SESSION:', req.session, 'USER ID:', userId);
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const [rows] = await req.db.execute(
      `SELECT manualTransactionId, manualAccountId, name, amount, date, note, type, category
       FROM ManualTransaction
       WHERE userId = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all manual transactions' });
  }
});

router.get('/:manualAccountId', async (req, res) => {
  const userId = req.session.userId;
  const { manualAccountId } = req.params;
  console.log('GET /:manualAccountId SESSION:', req.session, 'USER ID:', userId);
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const [rows] = await req.db.execute(
      `SELECT manualTransactionId, name, amount, date, note, type, category
       FROM ManualTransaction
       WHERE userId = ? AND manualAccountId = ?
       ORDER BY date DESC`,
      [userId, manualAccountId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch manual transactions' });
  }
});

router.post('/:manualAccountId', async (req, res) => {
  const userId = req.session.userId;
  const { manualAccountId } = req.params;
  const { name, amount, date, note, type, category } = req.body;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });
  if (!name || !amount || !date) return res.status(400).json({ error: 'Missing fields' });

  try {
    const [result] = await req.db.execute(
      `INSERT INTO ManualTransaction (userId, manualAccountId, name, amount, date, note, type, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, manualAccountId, name, amount, date, note || null, type, category]
    );
    res.status(201).json({ manualTransactionId: result.insertId, name, amount, date, note });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add manual transaction' });
  }
});

router.delete('/:manualTransactionId', async (req, res) => {
  const userId = req.session.userId;
  const { manualTransactionId } = req.params;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const [result] = await req.db.execute(
      `DELETE FROM ManualTransaction WHERE manualTransactionId = ? AND userId = ?`,
      [manualTransactionId, userId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete manual transaction' });
  }
});

module.exports = router;