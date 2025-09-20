/**
 * @file createAdminUser.js
 * @summary Standalone script to create an admin user with specified credentials.
 * Run this script to create the admin user: admin@test.com with password: admin123
 */

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

// Load the correct environment file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });
console.log(`🔧 Loaded environment: ${envFile}`);

async function createAdminUser() {
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

    console.log('Connected to MySQL');

    const adminEmail = 'admin@test.com';
    const adminPassword = 'admin123';
    const adminName = 'Admin User';

    // Check if admin user already exists
    const [existingUsers] = await db.execute(
      'SELECT * FROM User WHERE email = ?',
      [adminEmail]
    );

    if (existingUsers.length > 0) {
      console.log('Admin user already exists:', adminEmail);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const [result] = await db.execute(
      'INSERT INTO User (name, email, password, userType) VALUES (?, ?, ?, ?)',
      [adminName, adminEmail, hashedPassword, 'admin']
    );

    console.log('Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('User ID:', result.insertId);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    if (db) {
      await db.end();
      console.log('Database connection closed');
    }
  }
}

// Run the script
createAdminUser(); 