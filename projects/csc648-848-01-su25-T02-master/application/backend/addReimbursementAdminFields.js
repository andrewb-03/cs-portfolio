/**
 * @file addReimbursementAdminFields.js
 * @summary Adds admin-related fields to the ReimbursementRequest table for admin actions.
 * This script should be run to update the database schema for admin functionality.
 */

const mysql = require('mysql2/promise');

async function addReimbursementAdminFields() {
  let connection;
  
  try {
    // Create connection using environment variables
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'lemonaid_db'
    });

    console.log('🔗 Connected to database');

    // Check if ReimbursementRequest table exists
    const [tables] = await connection.execute('SHOW TABLES LIKE "ReimbursementRequest"');
    
    if (tables.length === 0) {
      console.log('ReimbursementRequest table does not exist. Please create it first.');
      return;
    }

    // Check if admin fields already exist
    const [columns] = await connection.execute('SHOW COLUMNS FROM ReimbursementRequest');
    const columnNames = columns.map(col => col.Field);
    
    const fieldsToAdd = [];
    
    if (!columnNames.includes('adminNotes')) {
      fieldsToAdd.push('ADD COLUMN adminNotes TEXT');
    }
    
    if (!columnNames.includes('adminId')) {
      fieldsToAdd.push('ADD COLUMN adminId INT UNSIGNED');
    }
    
    if (!columnNames.includes('adminActionDate')) {
      fieldsToAdd.push('ADD COLUMN adminActionDate TIMESTAMP NULL');
    }

    if (fieldsToAdd.length === 0) {
      console.log('All admin fields already exist in ReimbursementRequest table');
      return;
    }

    // Add the missing fields
    const alterQuery = `ALTER TABLE ReimbursementRequest ${fieldsToAdd.join(', ')}`;
    await connection.execute(alterQuery);

    // Add foreign key constraint for adminId if it was added
    if (!columnNames.includes('adminId')) {
      try {
        await connection.execute(`
          ALTER TABLE ReimbursementRequest 
          ADD CONSTRAINT fk_reimbursement_admin 
          FOREIGN KEY (adminId) REFERENCES User(userId) ON DELETE SET NULL
        `);
        console.log('Added foreign key constraint for adminId');
      } catch (err) {
        console.log('Could not add foreign key constraint (may already exist):', err.message);
      }
    }

    console.log('✅ Successfully added admin fields to ReimbursementRequest table:');
    fieldsToAdd.forEach(field => {
      console.log(`   - ${field.replace('ADD COLUMN ', '')}`);
    });

  } catch (err) {
    console.error('Error adding admin fields:', err);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  addReimbursementAdminFields()
    .then(() => {
      console.log('Migration completed');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}

module.exports = addReimbursementAdminFields; 