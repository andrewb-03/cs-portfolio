/**
 * @file accountBalance.js
 * @summary Retrieves and aggregates current balances from all financial accounts linked via Plaid.  
 * Authenticates the user session, fetches stored access tokens, and calls the Plaid API for data.  
 * Returns account details including name, type, and balance for each institution.
 */

const express = require('express');
const router = express.Router();
const plaidClient = require('../utils/plaidClient');

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Login required' });

  try {
    const [items] = await req.db.execute(
      `SELECT institutionName, accessToken FROM PlaidItem WHERE userId = ?`,
      [userId]
    );

    const allAccounts = [];

    for (const item of items) {
      const { accessToken, institutionName } = item;
      const response = await plaidClient.accountsBalanceGet({ access_token: accessToken });

      const accounts = response.data.accounts.map(acct => ({
        name: acct.name,
        official_name: acct.official_name,
        type: acct.type,
        subtype: acct.subtype,
        current_balance: acct.balances.current,
        institution: institutionName
      }));

      allAccounts.push(...accounts);
    }

    res.json(allAccounts);
  } catch (err) {
    console.error('Failed to get balances:', err);
    res.status(500).json({ error: 'Failed to fetch balances' });
  }
});

module.exports = router;
