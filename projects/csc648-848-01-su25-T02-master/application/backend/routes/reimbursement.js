/**
 * @file reimbursement.js
 * @summary Retrieves all reimbursement requests joined with transaction and user details for context.  
 * Orders results by request status and transaction date to prioritize pending items.  
 * Used to display reimbursement history and status to administrators or reviewers.
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // GET: fetch all reimbursement requests (both sent and received)
  router.get('/', async (req, res) => {
    try {
      const userId = req.session.userId;
      const userType = req.session.userType || 'standard';
      
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // First check if the ReimbursementRequest table exists
      const [tables] = await db.execute('SHOW TABLES LIKE "ReimbursementRequest"');
      
      if (tables.length === 0) {
        // Table doesn't exist, return empty array instead of error
        console.log('ReimbursementRequest table does not exist, returning empty array');
        return res.json([]);
      }

      // If admin, return all reimbursement requests
      if (userType === 'admin') {
        const [rows] = await db.execute(`
          SELECT 
            rr.requestId,
            rr.status,
            rr.amount,
            rr.notes,
            rr.createdAt as date,
            rr.recipientName,
            rr.recipientContact,
            rr.recipientEmail,
            sender.name AS senderName,
            sender.email AS senderEmail,
            recipient.name AS recipientName,
            recipient.email AS recipientEmail,
            rr.senderId,
            rr.recipientId,
            rr.type
          FROM ReimbursementRequest rr
          JOIN User sender ON rr.senderId = sender.userId
          LEFT JOIN User recipient ON rr.recipientId = recipient.userId
          ORDER BY rr.createdAt DESC
        `);
        return res.json(rows);
      }

      // For regular users, get reimbursements where user is either sender or recipient
      const [rows] = await db.execute(`
        SELECT 
          rr.requestId,
          rr.status,
          rr.amount,
          rr.notes,
          rr.createdAt as date,
          rr.recipientName,
          rr.recipientContact,
          rr.recipientEmail,
          sender.name AS senderName,
          recipient.name AS recipientName,
          rr.senderId,
          rr.recipientId,
          rr.type
        FROM ReimbursementRequest rr
        JOIN User sender ON rr.senderId = sender.userId
        LEFT JOIN User recipient ON rr.recipientId = recipient.userId
        WHERE rr.senderId = ? OR rr.recipientId = ?
        ORDER BY rr.createdAt DESC
      `, [userId, userId]);

      res.json(rows);
    } catch (err) {
      console.error('Error fetching reimbursements:', err);
      res.status(500).json({ message: 'Error fetching reimbursements' });
    }
  });

  // GET: fetch pending reimbursements for recipient approval
  router.get('/pending', async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const [rows] = await db.execute(`
        SELECT 
          rr.requestId,
          rr.status,
          rr.amount,
          rr.notes,
          rr.createdAt as date,
          rr.recipientName,
          rr.recipientContact,
          rr.recipientEmail,
          sender.name AS senderName,
          rr.senderId,
          rr.recipientId,
          rr.type
        FROM ReimbursementRequest rr
        JOIN User sender ON rr.senderId = sender.userId
        WHERE rr.recipientId = ? AND rr.status = 'pending'
        ORDER BY rr.createdAt DESC
      `, [userId]);

      res.json(rows);
    } catch (err) {
      console.error('Error fetching pending reimbursements:', err);
      res.status(500).json({ message: 'Error fetching pending reimbursements' });
    }
  });

  // POST: create a new reimbursement request
  router.post('/', async (req, res) => {
    const senderId = req.session.userId;
    const { recipientEmail, amount, notes, type = 'reimbursement', accountId } = req.body;

    // Validate user is logged in
    if (!senderId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Validate required fields
    if (!amount || !recipientEmail) {
      return res.status(400).json({ 
        message: 'Missing required fields: amount and recipientEmail are required' 
      });
    }

    // Validate amount is positive
    if (parseFloat(amount) <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    try {
      // First check if the ReimbursementRequest table exists
      const [tables] = await db.execute('SHOW TABLES LIKE "ReimbursementRequest"');
      
      if (tables.length === 0) {
        // Create the table if it doesn't exist
        await db.execute(`
          CREATE TABLE ReimbursementRequest (
            requestId INT AUTO_INCREMENT PRIMARY KEY,
            senderId INT UNSIGNED NOT NULL,
            recipientId INT UNSIGNED,
            recipientEmail VARCHAR(255) NOT NULL,
            recipientName VARCHAR(255),
            recipientContact VARCHAR(255),
            amount DECIMAL(10,2) NOT NULL,
            notes TEXT,
            status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
            type ENUM('reimbursement', 'payment') DEFAULT 'reimbursement',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (senderId) REFERENCES User(userId) ON DELETE CASCADE,
            FOREIGN KEY (recipientId) REFERENCES User(userId) ON DELETE CASCADE
          )
        `);
        console.log('Created ReimbursementRequest table');
      }

      // Validate recipient exists
      const [recipient] = await db.execute(
        'SELECT userId, name FROM User WHERE email = ?',
        [recipientEmail]
      );

      if (recipient.length === 0) {
        return res.status(400).json({ 
          message: 'Recipient not found. Please enter a valid email address.' 
        });
      }

      const recipientId = recipient[0].userId;
      const recipientName = recipient[0].name;

      // Check if sender is trying to send to themselves
      if (senderId === recipientId) {
        return res.status(400).json({ 
          message: 'You cannot send a reimbursement request to yourself' 
        });
      }

      const requestAmount = parseFloat(amount);

      // Handle different types of transactions
      if (type === 'send') {
        // For "send" type: sender sends money to recipient (immediate transfer)
        // Check if sender has sufficient balance in the selected account
        let balanceQuery, balanceParams;
        
        if (accountId) {
          // Use specific account
          balanceQuery = `
            SELECT balance 
            FROM UserAccount 
            WHERE accountId = ? AND userId = ?
          `;
          balanceParams = [accountId, senderId];
        } else {
          // Use total balance across all accounts
          balanceQuery = `
            SELECT SUM(balance) as balance 
            FROM UserAccount 
            WHERE userId = ?
          `;
          balanceParams = [senderId];
        }

        const [senderAccounts] = await db.execute(balanceQuery, balanceParams);
        const senderBalance = parseFloat(senderAccounts[0]?.balance || 0);
        
        if (senderBalance < requestAmount) {
          return res.status(400).json({ 
            message: `Insufficient balance. Your balance is $${senderBalance.toFixed(2)}, but you're trying to send $${requestAmount.toFixed(2)}` 
          });
        }

        // Perform immediate money transfer
        if (accountId) {
          // Deduct from specific account
          await db.execute(`
            UPDATE UserAccount 
            SET balance = balance - ? 
            WHERE accountId = ? AND userId = ? AND balance >= ?
          `, [requestAmount, accountId, senderId, requestAmount]);
        } else {
          // Deduct from any account (fallback)
          await db.execute(`
            UPDATE UserAccount 
            SET balance = balance - ? 
            WHERE userId = ? AND balance >= ?
          `, [requestAmount, senderId, requestAmount]);
        }

        // Add to recipient's account
        await db.execute(`
          UPDATE UserAccount 
          SET balance = balance + ? 
          WHERE userId = ?
        `, [requestAmount, recipientId]);

        // Insert the transaction with "completed" status
        const [result] = await db.execute(`
          INSERT INTO ReimbursementRequest (senderId, recipientId, recipientEmail, recipientName, amount, notes, status, type)
          VALUES (?, ?, ?, ?, ?, ?, 'completed', ?)
        `, [senderId, recipientId, recipientEmail, recipientName, amount, notes || null, type]);

        // Fetch the created request to return
        const [newRequest] = await db.execute(`
          SELECT 
            rr.requestId,
            rr.status,
            rr.amount,
            rr.notes,
            rr.createdAt as date,
            rr.recipientName,
            rr.recipientEmail,
            sender.name AS senderName,
            rr.senderId,
            rr.recipientId,
            rr.type
          FROM ReimbursementRequest rr
          JOIN User sender ON rr.senderId = sender.userId
          WHERE rr.requestId = ?
        `, [result.insertId]);

        res.status(201).json({
          message: 'Money sent successfully!',
          request: newRequest[0]
        });
        return;
      } else {
        // For "request" type: sender requests money from recipient (needs approval)
        // Insert the reimbursement request with pending status
        const [result] = await db.execute(`
          INSERT INTO ReimbursementRequest (senderId, recipientId, recipientEmail, recipientName, amount, notes, status, type)
          VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
        `, [senderId, recipientId, recipientEmail, recipientName, amount, notes || null, type]);

      // Fetch the created request to return
      const [newRequest] = await db.execute(`
        SELECT 
          rr.requestId,
          rr.status,
          rr.amount,
          rr.notes,
          rr.createdAt as date,
          rr.recipientName,
          rr.recipientEmail,
          sender.name AS senderName,
          rr.senderId,
          rr.recipientId,
          rr.type
        FROM ReimbursementRequest rr
        JOIN User sender ON rr.senderId = sender.userId
        WHERE rr.requestId = ?
      `, [result.insertId]);

      res.status(201).json({
        message: 'Reimbursement request created successfully',
        request: newRequest[0]
      });
      }

    } catch (err) {
      console.error('Error creating reimbursement request:', err);
      res.status(500).json({ message: 'Error creating reimbursement request' });
    }
  });

  // PUT: update reimbursement request status (approve/reject)
  router.put('/:requestId/status', async (req, res) => {
    const userId = req.session.userId;
    const { requestId } = req.params;
    const { status } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be pending, approved, or rejected' });
    }

    try {
      // Check if the request exists and user has permission to update it
      const [request] = await db.execute(`
        SELECT rr.requestId, rr.senderId, rr.recipientId, rr.amount, rr.status,
               sender.name as senderName, recipient.name as recipientName
        FROM ReimbursementRequest rr
        JOIN User sender ON rr.senderId = sender.userId
        JOIN User recipient ON rr.recipientId = recipient.userId
        WHERE rr.requestId = ?
      `, [requestId]);

      if (request.length === 0) {
        return res.status(404).json({ message: 'Reimbursement request not found' });
      }

      const reimbursement = request[0];

      // Only recipient can approve/reject, sender can only cancel (set to rejected)
      if (status === 'approved' && userId !== reimbursement.recipientId) {
        return res.status(403).json({ message: 'Only the recipient can approve reimbursement requests' });
      }

      if (status === 'rejected' && userId !== reimbursement.recipientId && userId !== reimbursement.senderId) {
        return res.status(403).json({ message: 'Only the sender or recipient can reject/cancel reimbursement requests' });
      }

      // If already processed, don't allow changes
      if (reimbursement.status !== 'pending') {
        return res.status(400).json({ message: 'This reimbursement request has already been processed' });
      }

      // If approved, transfer the money (update account balances)
      if (status === 'approved') {
        const amount = parseFloat(reimbursement.amount);
        
        // For reimbursement requests: recipient pays the sender
        // Check if recipient has sufficient balance
        const [recipientAccounts] = await db.execute(`
          SELECT SUM(balance) as totalBalance 
          FROM UserAccount 
          WHERE userId = ?
        `, [reimbursement.recipientId]);

        const recipientBalance = parseFloat(recipientAccounts[0]?.totalBalance || 0);
        
        if (recipientBalance < amount) {
          return res.status(400).json({ 
            message: `Recipient has insufficient balance. Their balance is $${recipientBalance.toFixed(2)}, but the request is for $${amount.toFixed(2)}` 
          });
        }

        // Deduct from recipient's account (they are paying the sender)
        await db.execute(`
          UPDATE UserAccount 
          SET balance = balance - ? 
          WHERE userId = ? AND balance >= ?
        `, [amount, reimbursement.recipientId, amount]);

        // Add to sender's account (they are receiving the money)
        await db.execute(`
          UPDATE UserAccount 
          SET balance = balance + ? 
          WHERE userId = ?
        `, [amount, reimbursement.senderId]);
      }

      // Update the status after successful money transfer (or for reject/cancel)
      await db.execute(`
        UPDATE ReimbursementRequest 
        SET status = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE requestId = ?
      `, [status, requestId]);

      res.json({ 
        message: 'Reimbursement request status updated successfully',
        status: status
      });

    } catch (err) {
      console.error('Error updating reimbursement request status:', err);
      res.status(500).json({ message: 'Error updating reimbursement request status' });
    }
  });

  // DELETE: cancel a reimbursement request (only sender can cancel)
  router.delete('/:requestId', async (req, res) => {
    const userId = req.session.userId;
    const { requestId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
      // Check if the request exists and user is the sender
      const [request] = await db.execute(`
        SELECT rr.requestId, rr.senderId, rr.status
        FROM ReimbursementRequest rr
        WHERE rr.requestId = ?
      `, [requestId]);

      if (request.length === 0) {
        return res.status(404).json({ message: 'Reimbursement request not found' });
      }

      const reimbursement = request[0];

      if (userId !== reimbursement.senderId) {
        return res.status(403).json({ message: 'Only the sender can cancel reimbursement requests' });
      }

      if (reimbursement.status !== 'pending') {
        return res.status(400).json({ message: 'Cannot cancel a processed reimbursement request' });
      }

      // Delete the request
      await db.execute(`
        DELETE FROM ReimbursementRequest 
        WHERE requestId = ?
      `, [requestId]);

      res.json({ message: 'Reimbursement request cancelled successfully' });

    } catch (err) {
      console.error('Error cancelling reimbursement request:', err);
      res.status(500).json({ message: 'Error cancelling reimbursement request' });
    }
  });

  // PATCH: toggle flag for reimbursement
  router.patch('/flag/:requestId', async (req, res) => {
    const userId = req.session.userId;
    const { requestId } = req.params;

    if (!userId) return res.status(401).json({ message: 'Not logged in' });

    try {
      const [current] = await db.execute(
        `SELECT isFlagged FROM ReimbursementRequest WHERE requestId = ? AND (senderId = ? OR recipientId = ?)`,
        [requestId, userId, userId]
      );

      if (current.length === 0) return res.status(404).json({ message: 'Not found or not authorized' });

      const newFlag = !current[0].isFlagged;
      await db.execute(
        `UPDATE ReimbursementRequest SET isFlagged = ? WHERE requestId = ?`,
        [newFlag, requestId]
      );

      res.json({ message: 'Flag toggled', isFlagged: newFlag });
    } catch (err) {
      console.error('Error toggling flag:', err);
      res.status(500).json({ message: 'Error toggling flag' });
    }
  });

  // PUT: Admin action on reimbursement request
  router.put('/:requestId/admin-action', async (req, res) => {
    const userId = req.session.userId;
    const userType = req.session.userType || 'standard';
    const { requestId } = req.params;
    const { status, adminNotes, adminId } = req.body;

    // Use session userId if adminId is not provided, is undefined, or is null
    const finalAdminId = (adminId && adminId !== null) ? adminId : userId;

    console.log('Admin action request:', {
      userId,
      userType,
      requestId,
      status,
      adminNotes,
      adminId,
      finalAdminId,
      session: req.session
    });

    if (!userId) {
      console.log('No userId in session');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (userType !== 'admin') {
      console.log('User is not admin, userType:', userType);
      return res.status(403).json({ message: 'Admin privileges required' });
    }

    // Validate status
    if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be pending, approved, rejected, or completed' });
    }

    // Validate adminId
    if (!finalAdminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    try {
      // Check if the request exists
      const [request] = await db.execute(`
        SELECT rr.requestId, rr.senderId, rr.recipientId, rr.amount, rr.status
        FROM ReimbursementRequest rr
        WHERE rr.requestId = ?
      `, [requestId]);

      if (request.length === 0) {
        return res.status(404).json({ message: 'Reimbursement request not found' });
      }

      const reimbursement = request[0];

      // Update the reimbursement with admin action
      console.log('Updating reimbursement request:', {
        requestId,
        status,
        adminNotes,
        adminId
      });
      
      await db.execute(`
        UPDATE ReimbursementRequest 
        SET status = ?, 
            adminNotes = ?, 
            adminId = ?,
            adminActionDate = CURRENT_TIMESTAMP,
            updatedAt = CURRENT_TIMESTAMP
        WHERE requestId = ?
      `, [status, adminNotes, finalAdminId, requestId]);

      console.log('Reimbursement request updated successfully');

      // If approved and both users are internal, handle money transfer
      if (status === 'approved' && reimbursement.recipientId) {
        try {
          console.log('Processing money transfer for approved request:', {
            senderId: reimbursement.senderId,
            recipientId: reimbursement.recipientId,
            amount: reimbursement.amount
          });

          // For reimbursement requests: recipient pays the sender (person requesting reimbursement)
          // Check if recipient has sufficient balance
          const [recipientAccounts] = await db.execute(`
            SELECT SUM(balance) as totalBalance 
            FROM UserAccount 
            WHERE userId = ?
          `, [reimbursement.recipientId]);

          const recipientBalance = parseFloat(recipientAccounts[0]?.totalBalance || 0);
          const requestAmount = parseFloat(reimbursement.amount);
          
          console.log('Balance check:', {
            recipientId: reimbursement.recipientId,
            recipientBalance,
            requestAmount
          });
          
          if (recipientBalance < requestAmount) {
            return res.status(400).json({ 
              message: `Recipient has insufficient balance. Their balance is $${recipientBalance.toFixed(2)}, but the request is for $${requestAmount.toFixed(2)}` 
            });
          }

          // Deduct from recipient's account (they are paying the sender)
          // First, find an account with sufficient balance
          const [recipientAccount] = await db.execute(`
            SELECT id, balance 
            FROM UserAccount 
            WHERE userId = ? AND balance >= ?
            LIMIT 1
          `, [reimbursement.recipientId, requestAmount]);

          if (recipientAccount.length === 0) {
            return res.status(400).json({ 
              message: `No account found with sufficient balance for recipient. Required: $${requestAmount.toFixed(2)}` 
            });
          }

          // Deduct from the specific account
          await db.execute(`
            UPDATE UserAccount 
            SET balance = balance - ? 
            WHERE id = ?
          `, [requestAmount, recipientAccount[0].id]);

          // Add to sender's account (they are receiving the money)
          // Find the first account for the sender
          const [senderAccount] = await db.execute(`
            SELECT id 
            FROM UserAccount 
            WHERE userId = ?
            LIMIT 1
          `, [reimbursement.senderId]);

          if (senderAccount.length === 0) {
            return res.status(400).json({ 
              message: `No account found for sender` 
            });
          }

          await db.execute(`
            UPDATE UserAccount 
            SET balance = balance + ? 
            WHERE id = ?
          `, [requestAmount, senderAccount[0].id]);

          console.log('Money transfer completed successfully');
        } catch (moneyTransferError) {
          console.error('Error during money transfer:', moneyTransferError);
          // Don't fail the entire request, just log the error
          console.log('Money transfer failed, but status update will continue');
        }
      }

      res.json({ 
        message: 'Reimbursement request admin action completed successfully',
        status: status
      });

    } catch (err) {
      console.error('Error processing admin action on reimbursement:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        requestId,
        status,
        adminId
      });
      res.status(500).json({ message: 'Error processing admin action' });
    }
  });

  return router;
};
