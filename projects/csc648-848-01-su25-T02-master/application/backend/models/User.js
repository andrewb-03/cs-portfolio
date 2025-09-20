/**
 * @file User.js
 * @summary Defines utility functions for interacting with the User table in the database.  
 * Supports user creation, email lookup, and retrieving profile info by user ID.  
 * Used by authentication and account-related routes for DB access abstraction.
 */

module.exports = {
  async createUser(db, name, email, hashedPassword, userType = 'standard') {
    console.log('createUser called with:', { name, email, hashedPassword, userType });
    const [result] = await db.execute(
      'INSERT INTO User (name, email, password, userType) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, userType]
    );
    return result;
  },

  async findUserByEmail(db, email) {
    const [rows] = await db.execute(
      'SELECT * FROM User WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

  async findUserById(db, userId) {
    const [rows] = await db.execute(
      'SELECT name, email, userType FROM User WHERE userId = ?',
      [userId]
    );
    return rows[0] || null;
  },

  async createAdminUser(db, name, email, hashedPassword) {
    console.log('createAdminUser called with:', { name, email, hashedPassword });
    
    const [result] = await db.execute(
      'INSERT INTO User (name, email, password, userType) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'admin']
    );
    return result;
  },

  async updateUserLanguage(db, userId, language) {
    const [result] = await db.execute(
      'UPDATE User SET language = ? WHERE userId = ?',
      [language, userId]
    );
    return result;
  }
};