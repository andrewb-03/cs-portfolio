/**
 * @file setup-admin.js
 * @summary Complete admin setup script that runs all necessary migrations and creates admin user.
 * Run this script to set up the complete admin functionality.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('Starting Admin Setup...\n');

try {
  // Step 1: Add userType field
  console.log('Step 1: Adding userType field to User table...');
  execSync('node routes/addUserTypeField.js', { stdio: 'inherit' });
  console.log('userType field setup complete\n');

  // Step 2: Create SupportTicket table
  console.log('📋 Step 2: Creating SupportTicket table...');
  execSync('node routes/createSupportTicketTable.js', { stdio: 'inherit' });
  console.log('SupportTicket table setup complete\n');

  // Step 3: Create admin user
  console.log('Step 3: Creating admin user...');
  execSync('node routes/createAdminUser.js', { stdio: 'inherit' });
  console.log(' dmin user setup complete\n');

  console.log('🎉 Admin setup completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Start the backend server: npm start');
  console.log('2. Start the frontend server: cd ../frontend && npm start');
  console.log('3. Login with admin credentials: admin@test.com / admin123');
  console.log('4. Access admin panel from the navigation menu');

} catch (error) {
  console.error('Setup failed:', error.message);
  process.exit(1);
} 