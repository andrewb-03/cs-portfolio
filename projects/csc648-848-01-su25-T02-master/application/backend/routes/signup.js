/**
 * 
 * @file signup.js
 * @summary Handles new user registration with input validation, password hashing, and duplicate checks.  
 * Accepts name, email, and password; stores user info securely in the database.  
 * Includes field formatting, regex validation, and detailed error handling.
 */

const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

const signupRoutes = (db) => {
  // Signup route (example with bcrypt + logging)
  const signup = async (req, res) => {
    let { name, email, password } = req.body;

    console.log('Incoming signup body:', req.body);

    name = typeof name === 'string' ? name.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password.trim() : '';

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
      const existing = await UserModel.findUserByEmail(db, email);
      if (existing) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.createUser(db, name, email, hashedPassword, 'standard');

      console.log(`New user created: ${email}`);
      res.json({ message: `Thanks for signing up, ${name}!` });
    } catch (err) {
      console.error('Error saving user:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  return {
    signup
  };
};

module.exports = signupRoutes; 