/**
 * @file reviews.js
 * @summary Enables users to submit reviews on chatbot interactions or overall experience.  
 * Validates input fields and stores reviews in the database with optional user/log associations.  
 * Also supports fetching and returning all reviews sorted by creation date.
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM Reviews ORDER BY createdAt DESC');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ error: 'Failed to load reviews' });
    }
  });

  router.post('/', async (req, res) => {
    const { logId, message, rating, type } = req.body;
    const userId = req.session.userId; // Get userId from session

    if (
      typeof message !== 'string' || message.trim() === '' ||
      typeof rating !== 'string' || !['1', '2', '3', '4', '5'].includes(rating) ||
      typeof type !== 'string' || !['chatbot', 'user_experiance'].includes(type)
    ) {
      return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    try {
      const [result] = await db.execute(
        `INSERT INTO Reviews (userId, logId, message, rating, type)
         VALUES (?, ?, ?, ?, ?)`,
        [userId || null, logId || null, message, rating, type]
      );
      res.status(201).json({ message: 'Review submitted successfully', id: result.insertId });
    } catch (err) {
      console.error('Error saving review:', err); // <-- Keep this!
      res.status(500).json({ error: 'Failed to save review', details: err.message });
    }
  });

  return router;
};
