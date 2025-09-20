/**
 * @file Support.js
 * @summary Submit, view, and manage your support tickets.  
 * Admins can view all tickets with user email.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_URL_BACKEND_PORT;

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('');
  const [submitMsg, setSubmitMsg] = useState('');
  const [error, setError] = useState('');

  const fetchUserInfo = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/session`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.userType) setUserType(data.userType);
    } catch (err) {
      console.error('Session fetch error:', err);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/support-tickets`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) setTickets(data);
      else setError(data.error || 'Failed to load tickets.');
    } catch (err) {
      console.error('Ticket fetch error:', err);
      setError('Could not fetch tickets.');
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg('');
    if (!subject || !message) {
      setSubmitMsg('Subject and message are required.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/support-tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ subject, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubject('');
        setMessage('');
        setSubmitMsg('Ticket submitted!');
        fetchTickets();
        setTimeout(() => setSubmitMsg(''), 3000);
      } else {
        setSubmitMsg(data.error || 'Failed to submit.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitMsg('Server error.');
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/support-tickets`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setTickets(tickets.filter(t => t.ticketId !== ticketId));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <>
      <Link to="/settings" className="text-sm text-gray-700 hover:underline mb-4 inline-block">
        ← Back to Settings
      </Link>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1C8536]">
        <img src="/settings-icons/support.png" alt="Support" className="w-6 h-6" />
        Support
      </h2>

      {userType === 'admin' ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-[#1C8536] mb-2">Admin Access Detected</h3>
          <p className="text-gray-600 mb-4">
            As an administrator, you can review and respond to all support tickets from the admin panel.
          </p>
          <Link 
            to="/admin/support" 
            className="bg-[#1C8536] text-white rounded py-2 px-4 hover:bg-lime-500 inline-block"
          >
            Go to Admin Support Panel
          </Link>
        </div>
      ) : (
        <>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              className="border rounded px-3 py-2"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="border rounded px-3 py-2"
              placeholder="Message"
              value={message}
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-[#1C8536] text-white rounded py-2 px-4 mt-2 hover:bg-lime-500"
              type="submit"
            >
              Submit Ticket
            </button>
            {submitMsg && <div className="text-sm text-green-700 mt-1">{submitMsg}</div>}
          </form>

          <div className="mt-6">
            <span className="font-semibold text-gray-800">Your Tickets</span>

            {tickets.length === 0 && (
              <div className="text-gray-500 mt-2">No tickets yet.</div>
            )}

            {tickets.map(ticket => (
              <div
                key={ticket.ticketId}
                className="bg-gray-100 rounded mt-2 px-4 py-2 flex justify-between text-sm"
              >
                <div>
                  <strong>{ticket.subject}</strong>
                  <p>{ticket.message}</p>
                  <p className="text-xs text-gray-600 italic mt-1">
                    Status: {ticket.status}
                    {ticket.adminResponse && (
                      <span> • Admin: {ticket.adminResponse}</span>
                    )}
                  </p>
                </div>
                <img
                  src="/settings-icons/delete.svg"
                  alt="Delete"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => deleteTicket(ticket.ticketId)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
