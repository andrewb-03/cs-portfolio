/**
 * @file auth.js
 * @summary Manages user login, logout, session validation, and profile retrieval.  
 * Adds support for password recovery via email verification and resetting stored credentials.  
 * Uses bcrypt for password hashing and session cookies for persistent login state.
 */

const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

module.exports = (db) => {
  const router = express.Router();

  // Get current logged-in user's info
  router.get('/me', async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const user = await UserModel.findUserById(db, req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ 
        userId: user.userId,
        name: user.name, 
        email: user.email, 
        userType: user.userType 
      });
    } catch (err) {
      console.error('Error in /me route:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Auth check route for /settings
  router.get('/settings', (req, res) => {
    if (req.session && req.session.userId) {
      res.status(200).json({ message: 'Authenticated', userId: req.session.userId });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

  // Session debug route
  router.get('/session', (req, res) => {
    res.json({
      session: req.session,
      userId: req.session.userId,
      userType: req.session.userType,
      authenticated: !!req.session.userId
    });
  });

  // Session refresh route
  router.post('/refresh-session', async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not logged in' });
    }
    try {
      const user = await UserModel.findUserById(db, req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.session.userType = user.userType;
      res.json({ 
        message: 'Session refreshed', 
        userId: req.session.userId,
        userType: req.session.userType 
      });
    } catch (err) {
      console.error('Error refreshing session:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Sign in
  router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      const user = await UserModel.findUserByEmail(db, email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      req.session.userId = user.userId;
      req.session.userType = user.userType;

      res.status(200).json({ 
        message: 'Login successful!',
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
          userType: user.userType
        }
      });
    } catch (err) {
      console.error('Signin error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Sign out
  router.post('/signout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Signout error:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('session_cookie_name');
      res.json({ message: 'Signed out successfully' });
    });
  });

  // Password recovery
  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    try {
      const user = await UserModel.findUserByEmail(db, email);
      if (!user) {
        return res.status(404).json({ error: 'Please enter a valid email' });
      }
      // Placeholder email action
      return res.json({ message: 'Email Received!' });
    } catch (err) {
      console.error('Forgot password error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Password reset
  router.post('/reset-password', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and new password are required' });
    }
    try {
      const user = await UserModel.findUserByEmail(db, email);
      if (!user) {
        return res.status(404).json({ error: 'Invalid email' });
      }
      const hashed = await bcrypt.hash(password, 10);
      await db.execute('UPDATE User SET password = ? WHERE email = ?', [hashed, email]);
      res.json({ message: 'Password updated successfully!' });
    } catch (err) {
      console.error('Reset password error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Create admin user
  router.post('/create-admin', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    try {
      const existing = await UserModel.findUserByEmail(db, email);
      if (existing) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.createAdminUser(db, name, email, hashedPassword);
      console.log(`New admin user created: ${email}`);
      res.json({ message: `Admin user created successfully: ${name}!` });
    } catch (err) {
      console.error('Error creating admin user:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  // Subscription notes update (from local branch)
  router.put('/subscriptions/:id/notes', async (req, res) => {
    const userId = req.session.userId;
    const subscriptionId = req.params.id;
    const { notes } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Login required' });
    }
    if (!notes || typeof notes !== 'string') {
      return res.status(400).json({ error: 'Notes are required' });
    }

    try {
      await db.execute(
        'UPDATE Subscription SET notes = ? WHERE userId = ? AND subscriptionId = ?',
        [notes, userId, subscriptionId]
      );
      res.json({ message: 'Notes updated successfully' });
    } catch (err) {
      console.error('Error updating subscription notes:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};
