/**
 * @file plaid.js
 * @summary Manages Plaid token creation, exchange, and financial data import for authenticated users.  
 * Imports linked accounts and transactions into the database, avoiding duplicates and updating balances.  
 * Handles multiple endpoints for linking, fetching, and synchronizing user bank data with Plaid.
 */

const express = require('express');
const router = express.Router();
const { plaidClient, getWebhookUrl } = require('../utils/plaidClient');

// 1. Create Link Token
router.post('/create_link_token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-123' },
      client_name: 'Limoney',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
      webhook: getWebhookUrl(),
    });
    res.json({ link_token: response.data.link_token });
  } catch (err) {
    console.error('Plaid Link Token Error:', err);
    res.status(500).json({ error: 'Could not create link token' });
  }
});

// 2. Exchange Public Token
router.post('/exchange_public_token', async (req, res) => {
  const { public_token } = req.body;
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ error: 'Login required' });

  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({ public_token });
    const access_token = tokenResponse.data.access_token;
    const item_id = tokenResponse.data.item_id;

    const itemData = await plaidClient.itemGet({ access_token });
    const institutionData = await plaidClient.institutionsGetById({
      institution_id: itemData.data.item.institution_id,
      country_codes: ['US'],
    });
    const institutionName = institutionData.data.institution.name;

    await req.db.execute(
      `INSERT INTO PlaidItem (userId, accessToken, itemId, institutionName)
       VALUES (?, ?, ?, ?)`,
      [userId, access_token, item_id, institutionName]
    );

    res.json({ access_token });
  } catch (err) {
    console.error('Exchange token error:', err);
    res.status(500).json({ error: 'Could not exchange public token' });
  }
});

// 3. Get Transactions (manual)
router.post('/get_transactions', async (req, res) => {
  const { access_token } = req.body;
  try {
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: '2024-01-01',
      end_date: '2025-12-31',
      options: {
        include_personal_finance_category: true,
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Plaid Transactions Error:', err);
    res.status(500).json({ error: 'Could not fetch transactions' });
  }
});

// 4. Import Transactions & Save Accounts
router.post('/import', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Login required' });

  try {
    const [items] = await req.db.execute(
      `SELECT accessToken, institutionName FROM PlaidItem WHERE userId = ?`,
      [userId]
    );

    if (items.length === 0) {
      return res.status(400).json({ error: 'No Plaid account linked' });
    }

    let totalImported = 0;

    for (const item of items) {
      const access_token = item.accessToken;
      const institutionName = item.institutionName;

      const accountsResponse = await plaidClient.accountsBalanceGet({ access_token });
      const plaidAccounts = accountsResponse.data.accounts;

      const accountMap = {};
      for (const acct of plaidAccounts) {
        const accountId = acct.account_id;
        const name = acct.name;
        const officialName = acct.official_name;
        const type = acct.type;
        const subtype = acct.subtype;
        const balance = acct.balances.current;

        accountMap[accountId] = name || officialName || null;

        await req.db.execute(
          `INSERT INTO UserAccount (userId, accountId, name, officialName, type, subtype, balance, institutionName)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             name = VALUES(name),
             officialName = VALUES(officialName),
             type = VALUES(type),
             subtype = VALUES(subtype),
             balance = VALUES(balance),
             institutionName = VALUES(institutionName)`,
          [userId, accountId, name, officialName, type, subtype, balance, institutionName]
        );
      }

      const response = await plaidClient.transactionsGet({
        access_token,
        start_date: '2024-01-01',
        end_date: '2025-12-31',
      });

      const transactions = response.data.transactions;

      for (const tx of transactions) {
        const plaidId = tx.transaction_id;

        const [exists] = await req.db.execute(
          `SELECT 1 FROM UserTransaction WHERE plaidTransactionId = ? AND userId = ?`,
          [plaidId, userId]
        );
        if (exists.length > 0) continue;

        const name = tx.name;
        const pfc = tx.personal_finance_category;
        const category = pfc?.detailed || tx.category?.[1] || 'Uncategorized';
        const pfcPrimary = pfc?.primary || null;
        const pfcConfidence = pfc?.confidence_level || null;
        const type = tx.amount < 0 ? 'income' : 'expense';
        const amount = Math.round(Math.abs(tx.amount * 100));
        const date = tx.date;
        const accountId = tx.account_id;
        const accountName = accountMap[accountId] || null;

        console.log('Importing TX:', {
          name,
          accountId,
          accountName
        });

        await req.db.execute(
        `INSERT INTO UserTransaction (
          userId, type, category, amount, date, name, source,
          plaidTransactionId, accountId, accountName, pfcPrimary, pfcConfidence
        ) VALUES (?, ?, ?, ?, ?, ?, 'plaid', ?, ?, ?, ?, ?)`,
        [userId, type, category, amount, date, name, plaidId, accountId, accountName, pfcPrimary, pfcConfidence]
      );

        totalImported++;
      }
    }

    res.json({ message: `Imported ${totalImported} transactions.` });
  } catch (err) {
    console.error('Error importing Plaid transactions:', err);
    res.status(500).json({ error: 'Failed to import transactions' });
  }
});

// 5. Get Recurring Transactions
router.post('/recurring', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const [items] = await req.db.execute(
      `SELECT accessToken FROM PlaidItem WHERE userId = ?`,
      [userId]
    );

    if (items.length === 0) {
      return res.status(400).json({ error: 'No Plaid accounts linked' });
    }

    let totalImported = 0;

    for (const item of items) {
      const access_token = item.accessToken;

      const response = await plaidClient.transactionsRecurringGet({ access_token });

      if (!response.data || (!Array.isArray(response.data.inflow_streams) && !Array.isArray(response.data.outflow_streams))) {
        console.error('Unexpected Plaid response format:', response.data);
        return res.status(500).json({ error: 'Invalid Plaid recurring response' });
      }

      const inflow = response.data.inflow_streams || [];
      const outflow = response.data.outflow_streams || [];
      const streams = [...inflow, ...outflow];

      for (const stream of streams) {
        const {
          stream_id,
          merchant_name,
          frequency,
          first_date,
          last_date,
          average_amount,
          status,
          personal_finance_category,
          transaction_ids
        } = stream;

        // Average Amount
        let avgAmount = 0;
        if (average_amount && typeof average_amount.amount === 'number') {
          avgAmount = Math.round(Math.abs(average_amount.amount * 100));
        } else {
          console.warn(`⚠️ No valid average_amount for stream ${stream_id}`);
        }

        // Fallback merchant name if missing
        let fallbackName = null;
        if ((!merchant_name || merchant_name.trim() === '') && transaction_ids?.length > 0) {
          const [rows] = await req.db.execute(
            `SELECT name FROM UserTransaction WHERE plaidTransactionId = ? LIMIT 1`,
            [transaction_ids[0]]
          );
          fallbackName = rows[0]?.name || null;
        }

        const category = personal_finance_category?.primary || 'Uncategorized';
        const nameToStore = merchant_name?.trim() || fallbackName || 'Unknown';

        // Fix isActive based on both `is_active` and `status`
        const isActive = stream.is_active === true || ['ACTIVE', 'MATURE'].includes(status?.toUpperCase?.())
          ? 1
          : 0;

        await req.db.execute(
          `INSERT INTO Subscription (
            userId, streamId, merchantName, category, frequency,
            firstDate, lastDate, averageAmount, isActive, source
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'plaid')
          ON DUPLICATE KEY UPDATE
            merchantName = VALUES(merchantName),
            category = VALUES(category),
            frequency = VALUES(frequency),
            firstDate = VALUES(firstDate),
            lastDate = VALUES(lastDate),
            averageAmount = VALUES(averageAmount),
            isActive = VALUES(isActive),
            source = 'plaid'`,
          [
            userId,
            stream_id,
            nameToStore,
            category,
            frequency ?? 'UNKNOWN',
            first_date ?? null,
            last_date ?? null,
            avgAmount,
            isActive
          ]
        );

        totalImported++;
      }
    }

    res.json({ message: `Imported ${totalImported} subscriptions.` });
  } catch (err) {
    console.error('Failed to fetch or store subscriptions:', err);
    res.status(500).json({ error: 'Subscription import failed' });
  }
});

// 6. Plaid Webhook for Real-time Transaction Updates
router.post('/webhook', async (req, res) => {
  const { webhook_type, item_id, new_transactions, removed_transactions } = req.body;
  
  console.log('Plaid Webhook received:', {
    webhook_type,
    item_id,
    new_transactions,
    removed_transactions
  });

  try {
    // Find the user associated with this item_id
    const [items] = await req.db.execute(
      `SELECT userId, accessToken FROM PlaidItem WHERE itemId = ?`,
      [item_id]
    );

    if (items.length === 0) {
      console.log('No user found for item_id:', item_id);
      return res.status(200).json({ message: 'Item not found' });
    }

    const { userId, accessToken } = items[0];

    if (webhook_type === 'TRANSACTIONS_DEFAULT_UPDATE' && new_transactions > 0) {
      // Fetch new transactions
      const response = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 7 days
        end_date: new Date().toISOString().split('T')[0],
        options: {
          include_personal_finance_category: true,
        }
      });

      const transactions = response.data.transactions;
      let importedCount = 0;

      for (const tx of transactions) {
        const plaidId = tx.transaction_id;

        // Check if transaction already exists
        const [exists] = await req.db.execute(
          `SELECT 1 FROM UserTransaction WHERE plaidTransactionId = ? AND userId = ?`,
          [plaidId, userId]
        );
        
        if (exists.length > 0) continue;

        // Get account name
        const [accountInfo] = await req.db.execute(
          `SELECT name FROM UserAccount WHERE accountId = ? AND userId = ?`,
          [tx.account_id, userId]
        );
        const accountName = accountInfo.length > 0 ? accountInfo[0].name : null;

        const pfc = tx.personal_finance_category;
        const category = pfc?.detailed || tx.category?.[1] || 'Uncategorized';
        const pfcPrimary = pfc?.primary || null;
        const pfcConfidence = pfc?.confidence_level || null;
        const type = tx.amount < 0 ? 'income' : 'expense';
        const amount = Math.round(Math.abs(tx.amount * 100));

        await req.db.execute(
          `INSERT INTO UserTransaction (
            userId, type, category, amount, date, name, source,
            plaidTransactionId, accountId, accountName, pfcPrimary, pfcConfidence
          ) VALUES (?, ?, ?, ?, ?, ?, 'plaid', ?, ?, ?, ?, ?)`,
          [userId, type, category, amount, tx.date, tx.name, plaidId, tx.account_id, accountName, pfcPrimary, pfcConfidence]
        );

        importedCount++;
      }

      console.log(`Webhook: Imported ${importedCount} new transactions for user ${userId}`);
    }

    if (webhook_type === 'TRANSACTIONS_REMOVED' && removed_transactions) {
      // Handle removed transactions if needed
      console.log(`Webhook: ${removed_transactions} transactions removed for user ${userId}`);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});


module.exports = router;
