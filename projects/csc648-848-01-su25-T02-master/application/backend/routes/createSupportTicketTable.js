/**
 * @file createSupportTicketTable.js
 * @summary Creates the SupportTicket table in the database if it doesn't exist.
 * Run this script to set up the support ticket functionality.
 */

const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

async function createSupportTicketTable() {
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

    console.log('Connected to database:', process.env.DB_NAME);

    // Check if SupportTicket table exists
    const [tables] = await db.execute("SHOW TABLES LIKE 'SupportTicket'");
    
    if (tables.length === 0) {
      // Create SupportTicket table
      await db.execute(`
        CREATE TABLE SupportTicket (
          ticketId INT AUTO_INCREMENT PRIMARY KEY,
          userId INT UNSIGNED NOT NULL,
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          status ENUM('open', 'in progress', 'closed') DEFAULT 'open',
          adminResponse TEXT,
          adminId INT UNSIGNED,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE,
          FOREIGN KEY (adminId) REFERENCES User(userId) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      
      console.log('SupportTicket table created successfully!');
    } else {
      console.log('SupportTicket table already exists');
    }

    // Verify table structure
    const [columns] = await db.execute("DESCRIBE SupportTicket");
    console.log('\nSupportTicket table structure:');
    columns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
    });

  } catch (error) {
    console.error('Error creating SupportTicket table:', error.message);
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('Make sure the User table exists first. Run the user setup scripts.');
    }
  } finally {
    if (db) {
      await db.end();
      console.log('Database connection closed');
    }
  }
}

// Run the function
createSupportTicketTable(); 