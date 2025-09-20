/**
 * @file notifications.js
 * @summary Manages creation, retrieval, updating, and deletion of user notifications or reminders.  
 * Ensures only authenticated users can access or modify their own scheduled notifications.  
 * Validates future-dated input and stores reminders in the Notification table.
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // GET all reminders for the logged-in user
  router.get('/', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Not logged in' });

    try {
      const [rows] = await db.execute(
        'SELECT * FROM Notification WHERE userId = ? ORDER BY date DESC',
        [userId]
      );
      res.json(rows); // Send raw UTC to frontend
    } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // CREATE a new reminder
  router.post('/', async (req, res) => {
    const userId = req.session.userId;
    const { type, content, date, recurrence = 'none' } = req.body;

    if (!userId || !type || !content || !date) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // Store the incoming date directly (assumed UTC from frontend)
    const scheduledDate = new Date(date);
    const now = new Date();

    if (scheduledDate < now) {
      return res.status(400).json({ message: 'Reminder must be set in the future' });
    }

    try {
      const [result] = await db.execute(
        'INSERT INTO Notification (userId, type, content, date, recurrence) VALUES (?, ?, ?, ?, ?)',
        [userId, type, content, scheduledDate, recurrence]
      );
      res.status(201).json({ message: 'Notification created', id: result.insertId });
    } catch (err) {
      console.error('Error creating notification:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // UPDATE an existing reminder
  router.put('/:id', async (req, res) => {
    const userId = req.session.userId;
    const { content, date, recurrence = 'none' } = req.body;
    const { id } = req.params;

    if (!userId || !content || !date) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // Store the incoming date directly (assumed UTC)
    const updatedDate = new Date(date);
    const now = new Date();

    if (updatedDate < now) {
      return res.status(400).json({ message: 'Reminder must be in the future' });
    }

    try {
      await db.execute(
        'UPDATE Notification SET content = ?, date = ?, recurrence = ? WHERE notificationId = ? AND userId = ?',
        [content, updatedDate, recurrence, id, userId]
      );
      res.json({ message: 'Reminder updated' });
    } catch (err) {
      console.error('Error updating notification:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // DELETE a reminder
  router.delete('/:id', async (req, res) => {
    const userId = req.session.userId;
    const notificationId = req.params.id;

    if (!userId) return res.status(401).json({ message: 'Not logged in' });

    try {
      await db.execute(
        'DELETE FROM Notification WHERE notificationId = ? AND userId = ?',
        [notificationId, userId]
      );
      res.json({ message: 'Deleted' });
    } catch (err) {
      console.error('Error deleting notification:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};