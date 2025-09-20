const express = require('express');
const router = express.Router();

// GET: Fetch tickets for current user (or all if admin)
router.get('/', async (req, res) => {
const userId = req.session.userId || null;
let userType = req.session.userType || 'standard';

  // Temporary fix: If userType is missing from session, check database
  if (userId && userType === 'standard') {
    try {
      const [user] = await req.db.execute(
        'SELECT userType FROM User WHERE userId = ?',
        [userId]
      );
      if (user.length > 0) {
        userType = user[0].userType;
        // Update session with userType
        req.session.userType = userType;
      }
    } catch (err) {
      console.error('Error fetching userType from database:', err);
    }
  }

  try {
    const [rows] = await req.db.execute(
      userType === 'admin'
        ? `SELECT st.*, u.email FROM SupportTicket st LEFT JOIN User u ON st.userId = u.userId ORDER BY st.ticketId DESC`
        : `SELECT * FROM SupportTicket WHERE userId = ? ORDER BY ticketId DESC`,
      userType === 'admin' ? [] : [userId]
    );
    
    res.json(rows);
  } catch (err) {
    console.error('Error fetching support tickets:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Submit a support ticket for the logged-in user only
router.post('/', async (req, res) => {
  const { userId } = req.session;
  const { subject, message } = req.body;

  if (!userId) return res.status(401).json({ error: 'Not logged in' });
  if (!subject || !message) return res.status(400).json({ error: 'Missing fields' });

  try {
    await req.db.execute(
      `INSERT INTO SupportTicket (userId, subject, message, status) VALUES (?, ?, ?, 'open')`,
      [userId, subject, message]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Admin response to support ticket
router.put('/:ticketId/respond', async (req, res) => {
  const { userId, userType } = req.session;
  const { ticketId } = req.params;
  const { adminResponse, status } = req.body;

  if (!userId) return res.status(401).json({ error: 'Not logged in' });
  if (userType !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  if (!adminResponse) return res.status(400).json({ error: 'Admin response is required' });

  try {
    // Check if ticket exists
    const [ticket] = await req.db.execute(
      `SELECT * FROM SupportTicket WHERE ticketId = ?`,
      [ticketId]
    );

    if (ticket.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Update ticket with admin response
    await req.db.execute(
      `UPDATE SupportTicket SET adminResponse = ?, status = ?, adminId = ? WHERE ticketId = ?`,
      [adminResponse, status || 'in progress', userId, ticketId]
    );

    res.json({ success: true, message: 'Response added successfully' });
  } catch (err) {
    console.error('Error updating ticket:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Delete a support ticket (admin or ticket owner)
router.delete('/:ticketId', async (req, res) => {
  const { userId, userType } = req.session;
  const { ticketId } = req.params;

  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    if (userType === 'admin') {
      // Admin can delete any ticket
      await req.db.execute(`DELETE FROM SupportTicket WHERE ticketId = ?`, [ticketId]);
    } else {
      // User can only delete their own tickets
      await req.db.execute(`DELETE FROM SupportTicket WHERE ticketId = ? AND userId = ?`, [ticketId, userId]);
    }

    res.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (err) {
    console.error('Error deleting ticket:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
