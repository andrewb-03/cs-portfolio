/**
 * @file plaidAccounts.js
 * @summary Fetches a list of financial institutions linked to the current user via Plaid.  
 * Verifies session authentication and queries stored Plaid access tokens for the user.  
 * Returns institution names and tokens used for further Plaid API requests.
 */

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const [rows] = await req.db.execute(
      `SELECT institutionName, accessToken FROM PlaidItem WHERE userId = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch accounts:', err);
    res.status(500).json({ error: 'Could not fetch accounts' });
  }
});

module.exports = router;
