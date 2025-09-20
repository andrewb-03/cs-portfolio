/**
 * @file addUserTypeField.js
 * @summary Database migration script to add userType field to User table.
 * Run this script to add the userType ENUM field for admin functionality.
 */

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

// Load the correct environment file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });
console.log(`🔧 Loaded environment: ${envFile}`);

async function addUserTypeField() {
  let db;
  
  try {
    // Connect to database
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✅ Connected to MySQL');

    // Check if userType column already exists
    const [columns] = await db.execute(
      "SHOW COLUMNS FROM User LIKE 'userType'"
    );

    if (columns.length > 0) {
      console.log('⚠️  userType column already exists in User table');
      return;
    }

    // Add userType column
    await db.execute(
      "ALTER TABLE User ADD COLUMN userType ENUM('standard', 'admin') DEFAULT 'standard'"
    );

    console.log('userType column added to User table');

    // Update existing users to have 'standard' userType
    await db.execute(
      "UPDATE User SET userType = 'standard' WHERE userType IS NULL"
    );

    console.log('Existing users updated to have standard userType');

  } catch (error) {
    console.error('Error adding userType field:', error);
  } finally {
    if (db) {
      await db.end();
      console.log('Database connection closed');
    }
  }
}

// Run the migration
addUserTypeField(); 