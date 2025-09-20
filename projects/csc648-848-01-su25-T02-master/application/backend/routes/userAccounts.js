/**
 * @file userAccounts.js
 * @summary Retrieves all bank accounts linked to the current user, including balances and metadata.  
 * Queries the UserAccount table and returns account names, types, and institutions.  
 * Requires an active user session to authorize access to stored financial data.
 */

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    // Fetch accounts from UserAccount
    const [accounts] = await req.db.execute(
      `SELECT accountId, name, officialName, type, subtype, balance, institutionName 
       FROM UserAccount 
       WHERE userId = ?`,
      [userId]
    );

    // Adjust balance for each account by including manual transactions
    for (let account of accounts) {
      const [transactions] = await req.db.execute(
        `SELECT amount, type FROM UserTransaction 
         WHERE userId = ? AND accountId = ? AND source = 'manual'`,
        [userId, account.accountId]
      );
      const manualBalance = transactions.reduce((sum, tx) => {
        const amount = parseFloat(tx.amount);
        return sum + (tx.type === 'income' ? amount : -amount);
      }, 0);
      account.balance = (parseFloat(account.balance) + manualBalance).toFixed(2);
    }

    res.json(accounts);
  } catch (err) {
    console.error('Failed to fetch user accounts:', err);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

module.exports = router;