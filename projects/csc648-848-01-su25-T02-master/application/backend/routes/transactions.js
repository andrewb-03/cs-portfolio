/**
 * @file transactions.js
 * @summary Manages all user transaction operations including load, search, add, edit, delete, and reset.  
 * Clones global transactions to user space and handles persistent user-owned transaction records.  
 * Includes dynamic filters, secure ownership checks, and intelligent duplication avoidance.
 */
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const categoryMap = {
    "Fast Food": "Food/Dining",
    "Restaurants": "Food/Dining",
    "Coffee Shop": "Food/Dining",
    "Supermarkets": "Groceries",
    "Grocery Stores": "Groceries",
    "Ride Share": "Transportation",
    "Taxi": "Transportation",
    "Parking": "Transportation",
    "Gas": "Transportation",
    "Public Transportation": "Transportation",
    "Streaming Services": "Subscriptions",
    "Subscription": "Subscriptions",
    "Entertainment": "Entertainment",
    "Movies": "Entertainment",
    "Music and Audio": "Entertainment",
    "Recreation": "Entertainment",
    "Rent": "Housing",
    "Mortgage": "Housing",
    "Utilities": "Housing",
    "Payroll": "Income",
    "Paycheck": "Income",
    "Direct Deposit": "Income",
    "Bonus": "Income",
    "Interest": "Income",
    "Refund": "Income"
  };

  router.get('/', async (req, res) => {
    const userId = req.session.userId;
    const accountId = req.query.accountId;

    try {
      let baseQuery = 'SELECT *, "user" AS source FROM UserTransaction WHERE userId = ?';
      let queryParams = [userId];

      if (accountId) {
        baseQuery += ' AND accountId = ?';
        queryParams.push(accountId);
      }

      baseQuery += ' ORDER BY date DESC';

      const [userRows] = await db.execute(baseQuery, queryParams);
      res.json(userRows);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  });

  router.get('/search', async (req, res) => {
    const { filter = 'name', query = '', sort, accountId } = req.query;
    const userId = req.session.userId;

    if (!userId) return res.status(401).json({ error: 'Login required' });

    let baseTable = 'UserTransaction';
    let where = 'WHERE userId = ?';
    let values = [userId];

    if (accountId) {
      where += ' AND accountId = ?';
      values.push(accountId);
    }

    if (query.trim()) {
      if (filter === 'amount' && !isNaN(query)) {
        const num = parseFloat(query);
        where += ' AND amount BETWEEN ? AND ?';
        values.push(num * 0.75, num * 1.25);
      } else if (["category", "type", "name"].includes(filter)) {
        where += ` AND ${filter} LIKE ?`;
        values.push(`%${query}%`);
      }
    }

    let order = '';
    if (sort === 'asc') order = 'ORDER BY ABS(amount) ASC';
    else if (sort === 'desc') order = 'ORDER BY ABS(amount) DESC';
    else if (sort === 'newest') order = 'ORDER BY date DESC';
    else if (sort === 'oldest') order = 'ORDER BY date ASC';
    else if (sort === 'flagged') order = 'ORDER BY isFlagged DESC, date DESC';

    const sql = `SELECT * FROM ${baseTable} ${where} ${order}`;

    try {
      const [rows] = await db.execute(sql, values);
      res.json(rows);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: 'Search failed' });
    }
  });

  router.post('/', async (req, res) => {
    const userId = req.session.userId;
    const {
      amount,
      category,
      type,
      date,
      source = 'manual',
      plaidTransactionId,
      name,
      accountName,
      accountId
    } = req.body;
    const parsedAmount = parseFloat(amount);

    if (!userId) return res.status(403).json({ error: 'Login required' });
    if (!parsedAmount || !type || !date)
      return res.status(400).json({ error: 'Missing required fields' });

    try {
      if (source === 'plaid' && plaidTransactionId) {
        const [existing] = await db.execute(
          'SELECT 1 FROM UserTransaction WHERE plaidTransactionId = ?',
          [plaidTransactionId]
        );
        if (existing.length > 0) {
          return res.status(409).json({ error: 'Duplicate Plaid transaction' });
        }
      }

      const plaidCategory = Array.isArray(category) ? category.at(-1) : category;
      const mappedCategory = categoryMap[plaidCategory] || 'Misc.';

      const [result] = await db.execute(
        `INSERT INTO UserTransaction
          (userId, type, category, amount, date, source, plaidTransactionId, name, accountName, accountId)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          type,
          mappedCategory,
          parsedAmount,
          date,
          source,
          plaidTransactionId ?? null,
          name ?? null,
          accountName ?? null,
          accountId ?? null
        ]
      );

      res.status(201).json({ message: 'Transaction added', id: result.insertId });
    } catch (err) {
      console.error('Add error:', err);
      res.status(500).json({ error: 'Failed to add transaction' });
    }
  });

  router.put('/:id', async (req, res) => {
    const userId = req.session.userId;
    const id = req.params.id;
    const { amount, category, type, date } = req.body;
    const parsedAmount = parseFloat(amount);

    if (!userId) return res.status(401).json({ error: 'Login required' });
    if (!parsedAmount || !category || !type || !date)
      return res.status(400).json({ error: 'Missing required fields' });

    try {
      const [check] = await db.execute(
        'SELECT source, amount, type, accountId FROM UserTransaction WHERE id = ? AND userId = ?',
        [id, userId]
      );
      if (check.length === 0) {
        return res.status(404).json({ error: 'Transaction not found or not yours' });
      }
      if (check[0].source === 'plaid') {
        return res.status(403).json({ error: 'Cannot edit Plaid transactions' });
      }

      // Calculate balance adjustment
      const oldAmount = parseFloat(check[0].amount);
      const oldType = check[0].type;
      const accountId = check[0].accountId;
      let adjustment = 0;
      if (accountId) {
        const oldEffect = oldType === 'income' ? oldAmount : -oldAmount;
        const newEffect = type === 'income' ? parsedAmount : -parsedAmount;
        adjustment = newEffect - oldEffect;
      }

      // Update transaction
      const [result] = await db.execute(
        `UPDATE UserTransaction 
         SET amount = ?, category = ?, type = ?, date = ?
         WHERE id = ? AND userId = ?`,
        [parsedAmount, category, type, date, id, userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Transaction not found or not yours' });
      }

      res.json({ message: 'Transaction updated' });
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const userId = req.session.userId;
    const id = req.params.id;

    if (!userId) return res.status(401).json({ error: 'Login required' });

    try {
      const [check] = await db.execute(
        'SELECT source, amount, type, accountId FROM UserTransaction WHERE id = ? AND userId = ?',
        [id, userId]
      );
      if (check.length === 0) {
        return res.status(404).json({ error: 'Transaction not found or not yours' });
      }
      if (check[0].source === 'plaid') {
        return res.status(403).json({ error: 'Cannot delete Plaid transactions' });
      }

      const accountId = check[0].accountId;
      const amount = parseFloat(check[0].amount);
      const type = check[0].type;

      // Delete transaction
      const [result] = await db.execute(
        'DELETE FROM UserTransaction WHERE id = ? AND userId = ?',
        [id, userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Transaction not found or not yours' });
      }

      res.json({ message: 'Transaction deleted' });
    } catch (err) {
      console.error('Delete error:', err);
      res.status(500).json({ error: 'Failed to delete transaction' });
    }
  });

  router.post('/reset', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Login required' });

    try {
      await db.execute(
        'DELETE FROM UserTransaction WHERE userId = ? AND source != "plaid"',
        [userId]
      );

      const [globalTxs] = await db.execute('SELECT * FROM Transaction');

      if (globalTxs.length === 0) {
        return res.json({ message: 'No global transactions to clone' });
      }

      const values = globalTxs.map(tx => [
        userId,
        tx.type,
        tx.category,
        tx.amount,
        tx.date,
        tx.transactionId
      ]);

      await db.query(
        `INSERT INTO UserTransaction (userId, type, category, amount, date, originalTransactionId)
         VALUES ?`,
        [values]
      );

      res.json({ message: `Reset with ${values.length} global transactions` });
    } catch (err) {
      console.error('Reset error:', err);
      res.status(500).json({ error: 'Failed to reset transactions' });
    }
  });

  router.get('/subscriptions', async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Login required' });
    }

    try {
      const [subscriptions] = await db.execute(
        `SELECT 
          id,
          name,
          amount,
          date,
          category,
          type,
          source,
          accountName,
          accountId,
          notes
        FROM UserTransaction 
        WHERE userId = ? AND category = 'Subscription'
        ORDER BY date DESC`,
        [userId]
      );

      const transformedSubscriptions = subscriptions.map(sub => {
        let subscriptionType = 'monthly';
        const name = sub.name ? sub.name.toLowerCase() : '';
        const amount = Math.abs(parseFloat(sub.amount));
        
        if (name.includes('yearly') || name.includes('annual') || amount > 100) {
          subscriptionType = 'yearly';
        } else if (name.includes('weekly') || amount < 10) {
          subscriptionType = 'weekly';
        } else {
          subscriptionType = 'monthly';
        }

        const lastDate = new Date(sub.date);
        const nextDue = new Date(lastDate);
        nextDue.setMonth(nextDue.getMonth() + 1);

        return {
          id: sub.id.toString(),
          name: sub.name || 'Unknown Subscription',
          type: subscriptionType,
          amount: parseFloat(sub.amount),
          recurs: subscriptionType === 'yearly' ? 'Once a year' : 
                  subscriptionType === 'weekly' ? 'Every week' : 'Monthly',
          nextDue: nextDue.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit'
          }),
          notes: sub.notes || `From ${sub.accountName || 'Unknown Account'}`,
          cancelled: false
        };
      });

      res.json(transformedSubscriptions);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
  });

  router.put('/subscriptions/:id/notes', async (req, res) => {
    const userId = req.session.userId;
    const subscriptionId = req.params.id;
    const { notes } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Login required' });
    }

    if (!notes || typeof notes !== 'string') {
      return res.status(400).json({ error: 'Notes are required' });
    }

    try {
      const [result] = await db.execute(
        `UPDATE UserTransaction 
         SET notes = ? 
         WHERE id = ? AND userId = ? AND category = 'Subscription'`,
        [notes, subscriptionId, userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Subscription not found or not yours' });
      }

      res.json({ message: 'Subscription notes updated successfully' });
    } catch (err) {
      console.error('Error updating subscription notes:', err);
      res.status(500).json({ error: 'Failed to update subscription notes' });
    }
  });

  router.patch('/flag/:id', async (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    try {
      const [current] = await db.execute(
        `SELECT isFlagged FROM UserTransaction WHERE id = ? AND userId = ?`,
        [id, userId]
      );

      if (!current.length) return res.status(404).json({ error: 'Transaction not found' });

      const newFlag = current[0].isFlagged ? 0 : 1;

      await db.execute(
        `UPDATE UserTransaction SET isFlagged = ? WHERE id = ? AND userId = ?`,
        [newFlag, id, userId]
      );

      res.json({ success: true, isFlagged: newFlag });
    } catch (err) {
      console.error('Error toggling flag:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // GET: Fetch flagged transactions (admin only)
  router.get('/flagged', async (req, res) => {
    const { userId, userType } = req.session;

    if (!userId) return res.status(401).json({ error: 'Not logged in' });
    if (userType !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    try {
      const [rows] = await db.execute(`
        SELECT 
          ut.id,
          ut.amount,
          ut.category,
          ut.name as description,
          ut.type,
          ut.createdAt,
          ut.isFlagged,
          u.name as userName,
          u.email as userEmail
        FROM UserTransaction ut
        JOIN User u ON ut.userId = u.userId
        WHERE ut.isFlagged = 1
        ORDER BY ut.createdAt DESC
      `);

      res.json(rows);
    } catch (err) {
      console.error('Error fetching flagged transactions:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // PATCH: Admin unflag transaction (admin only)
  router.patch('/flagged/:id/unflag', async (req, res) => {
    const { userId, userType } = req.session;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ error: 'Not logged in' });
    if (userType !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    try {
      // Check if transaction exists and is flagged
      const [transaction] = await db.execute(
        `SELECT id, isFlagged FROM UserTransaction WHERE id = ?`,
        [id]
      );

      if (!transaction.length) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      if (!transaction[0].isFlagged) {
        return res.status(400).json({ error: 'Transaction is not flagged' });
      }

      // Unflag the transaction
      await db.execute(
        `UPDATE UserTransaction SET isFlagged = 0 WHERE id = ?`,
        [id]
      );

      res.json({ success: true, message: 'Transaction unflagged successfully' });
    } catch (err) {
      console.error('Error unflagging transaction:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Get recent transactions (last 24 hours)
  router.get('/recent', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    try {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const [transactions] = await db.execute(
        `SELECT * FROM UserTransaction 
         WHERE userId = ? AND date >= ? 
         ORDER BY date DESC, id DESC`,
        [userId, yesterday]
      );

      res.json({ transactions });
    } catch (err) {
      console.error('Error fetching recent transactions:', err);
      res.status(500).json({ error: 'Failed to fetch recent transactions' });
    }
  });

  return router;
};