/**
 * @file deleteAccount.js
 * @summary Authenticates user credentials before permanently deleting their account from the database.  
 * Confirms session and password, then removes the user and clears session and cookie data.  
 * Includes extra logging for traceability during the account removal process.
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const express = require('express');
  const bcrypt = require('bcrypt');
  const router = express.Router();

  router.post('/', async (req, res) => {
  const userId = req.session.userId;
  const { password } = req.body;

  console.log('Incoming delete-account request for userId:', userId);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM User WHERE userId = ?', [userId]);
    const userRecord = rows[0];

    if (!userRecord) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, userRecord.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    console.log('🗑 Deleting user:', userId);
    await db.execute('DELETE FROM User WHERE userId = ?', [userId]);

    req.session.destroy(err => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ message: 'Failed to destroy session' });
      }

      res.clearCookie('session_cookie_name');
      return res.status(200).json({ message: 'Account deleted successfully' });
    });

  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({
      message: 'Server error',
      error: err.message,
      stack: err.stack
    });
  }
});


  return router;
};