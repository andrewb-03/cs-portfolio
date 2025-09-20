const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // GET /api/personalinfo_edit - Get user's personal info
  router.get('/', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const [rows] = await db.execute('SELECT name, email FROM User WHERE userId = ?', [userId]);
      if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

      res.json(rows[0]);
    } catch (err) {
      console.error('Error fetching user info:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // PUT /api/personalinfo_edit - Update user's name and email
  router.put('/', async (req, res) => {
    const userId = req.session.userId;
    const { name, email } = req.body;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

    try {
      // Check if email is already taken by another user
      const [existing] = await db.execute(
        'SELECT userId FROM User WHERE email = ? AND userId != ?',
        [email, userId]
      );
      if (existing.length > 0) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      // Update user
      await db.execute('UPDATE User SET name = ?, email = ? WHERE userId = ?', [name, email, userId]);
      res.json({ message: 'User info updated' });
    } catch (err) {
      console.error('Error updating user info:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};