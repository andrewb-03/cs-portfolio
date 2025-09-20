const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Login required' });

    try {
      const [rows] = await db.execute(
        `SELECT * FROM Subscription WHERE userId = ? ORDER BY averageAmount DESC`,
        [userId]
      );
      res.json(rows);
    } catch (err) {
      console.error('Failed to fetch subscriptions:', err);
      res.status(500).json({ error: 'Failed to load subscriptions' });
    }
  });

  return router;
};
