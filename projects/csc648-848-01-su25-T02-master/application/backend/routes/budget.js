const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // GET: fetch all budget limits for a user in a given month/year
  router.get('/', async (req, res) => {
    const userId = req.session.userId;
    const { year, month } = req.query;

    if (!userId || !year || !month) {
      return res.status(400).json({ message: 'Missing userId (session), year, or month' });
    }

    try {
      const [rows] = await db.execute(
        'SELECT category, limitAmount FROM Budget WHERE userId = ? AND year = ? AND month = ?',
        [userId, year, month]
      );
      res.json(rows);
    } catch (err) {
      console.error('GET /api/budget error:', err);
      res.status(500).json({ message: 'Error fetching budget data' });
    }
  });

  // POST: set or update budget limit for a category/month/year for the logged-in user
  router.post('/', async (req, res) => {
    const userId = req.session.userId;
    const { category, limitAmount, year, month } = req.body;

    if (!userId || !category || !limitAmount || !year || !month) {
      return res.status(400).json({ message: 'Missing required budget fields' });
    }

    try {
      await db.execute(`
        INSERT INTO Budget (userId, category, limitAmount, year, month)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE limitAmount = VALUES(limitAmount)
      `, [userId, category, limitAmount, year, month]);

      res.json({ message: 'Budget saved' });
    } catch (err) {
      console.error('POST /api/budget error:', err);
      res.status(500).json({ message: 'Error saving budget' });
    }
  });

  // DELETE: remove a budget entry for a user/category/month/year
  router.delete('/', async (req, res) => {
    const userId = req.session.userId;
    const { category, year, month } = req.body;

    if (!userId || !category || !year || !month) {
      return res.status(400).json({ message: 'Missing fields for delete' });
    }

    try {
      await db.execute(
        'DELETE FROM Budget WHERE userId = ? AND category = ? AND year = ? AND month = ?',
        [userId, category, year, month]
      );
      res.json({ message: 'Budget reset' });
    } catch (err) {
      console.error('DELETE /api/budget error:', err);
      res.status(500).json({ message: 'Error deleting budget' });
    }
  });

  return router;
};
