/**
 * @file AdminSupport.js
 * @summary Admin interface for reviewing and responding to support tickets from users.
 * Only accessible to admin users.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSupport.css';
import { useTranslation } from 'react-i18next';


const BACKEND_URL = process.env.REACT_APP_URL_BACKEND_PORT;

function AdminSupport() {
  const { t } = useTranslation('settings');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [status, setStatus] = useState('in progress');
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/me`, {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
          if (userData.userType !== 'admin') {
            setError('Access denied. Admin privileges required.');
            return;
          }
          
          // Refresh session to ensure userType is set correctly
          try {
            await fetch(`${BACKEND_URL}/api/refresh-session`, {
              method: 'POST',
              credentials: 'include'
            });
          } catch (err) {
            console.log('Session refresh failed, continuing anyway:', err);
          }
          
          fetchTickets();
        } else {
          setError('Failed to fetch user information');
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/support-tickets`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setTickets(data);
        setError(''); // Clear any previous errors
      } else {
        setError(data.error || 'Failed to load tickets from database.');
      }
    } catch (err) {
      console.error('❌ Ticket fetch error:', err);
      setError('Could not connect to database. Please check your connection.');
    }
  };

  // Add auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (userInfo && userInfo.userType === 'admin') {
        fetchTickets();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [userInfo]);

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!selectedTicket || !adminResponse.trim()) {
      alert('Please enter a response');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/support-tickets/${selectedTicket.ticketId}/respond`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ adminResponse, status }),
      });

      const data = await res.json();
      if (res.ok) {
        setAdminResponse('');
        setSelectedTicket(null);
        fetchTickets(); // Refresh the list from database
        alert('Response sent successfully! Database updated.');
      } else {
        alert(data.error || 'Failed to send response to database.');
      }
    } catch (err) {
      console.error('❌ Response error:', err);
      alert('Database connection error. Please try again.');
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket from the database?')) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/support-tickets/${ticketId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setTickets(tickets.filter(t => t.ticketId !== ticketId));
        if (selectedTicket && selectedTicket.ticketId === ticketId) {
          setSelectedTicket(null);
        }
        alert('Ticket deleted from database successfully!');
      } else {
        const data = await res.json();
        console.error('❌ Failed to delete ticket:', data.error);
        alert('Failed to delete ticket from database.');
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert('Database connection error. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in progress': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="admin-support-bg">
        <div className="admin-support-wrapper">
          <div className="admin-loading">Loading support tickets...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-support-bg">
        <div className="admin-support-wrapper">
          <div className="admin-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!userInfo || userInfo.userType !== 'admin') {
    return (
      <div className="admin-support-bg">
        <div className="admin-support-wrapper">
          <div className="admin-error">Access denied. Admin privileges required.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-support-bg">
      <div className="admin-support-wrapper">
        {/* Header */}
        <div className="admin-support-header">
          <button 
            onClick={() => navigate('/admin')}
            className="back-button"
          >
            ← Back to Admin Panel
          </button>
          <h1 className="admin-support-title">Support Ticket Management</h1>
          <p className="admin-support-subtitle">Review and respond to user support tickets</p>
        </div>

        {/* Ticket List */}
        <div className="admin-support-content">
          <div className="tickets-section">
            <h2 className="section-title">All Support Tickets ({tickets.length})</h2>
            
            {tickets.length === 0 ? (
              <div className="no-tickets">No support tickets found.</div>
            ) : (
              <div className="tickets-list">
                {tickets.map(ticket => (
                  <div 
                    key={ticket.ticketId}
                    className={`ticket-item ${selectedTicket?.ticketId === ticket.ticketId ? 'selected' : ''}`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="ticket-header">
                      <h3 className="ticket-subject">{ticket.subject}</h3>
                      <span className={`ticket-status ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="ticket-message">{ticket.message}</p>
                    <div className="ticket-meta">
                      <span className="ticket-user">User: {ticket.email || 'Unknown'}</span>
                    </div>
                    {ticket.adminResponse && (
                      <div className="ticket-response">
                        <strong>Admin Response:</strong> {ticket.adminResponse}
                      </div>
                    )}
                    <button
                      className="delete-ticket-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTicket(ticket.ticketId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Response Section */}
          {selectedTicket ? (
            <div className="response-section">
              <h2 className="section-title">Respond to Ticket</h2>
              <div className="selected-ticket-info">
                <h3>{selectedTicket.subject}</h3>
                <p><strong>From:</strong> {selectedTicket.email || 'Unknown'}</p>
                <p><strong>Status:</strong> {selectedTicket.status}</p>
                <p><strong>Message:</strong> {selectedTicket.message}</p>
              </div>
              
              <form onSubmit={handleRespond} className="response-form">
                <div className="form-group">
                  <label htmlFor="status">Update Status:</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="status-select"
                  >
                    <option value="in progress">In Progress</option>
                    <option value="closed">Closed</option>
                    <option value="open">Reopen</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="response">Admin Response:</label>
                  <textarea
                    id="response"
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    placeholder="Enter your response to the user..."
                    rows={4}
                    className="response-textarea"
                    required
                  />
                </div>
                
                <div className="response-actions">
                  <button type="submit" className="send-response-btn">
                    Send Response
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedTicket(null)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="placeholder-section">
              <div className="placeholder-content">
                <div className="placeholder-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="placeholder-title">Select Support Ticket</h2>
                <p className="placeholder-description">
                  Choose a support ticket from the list on the left to view details and respond to the user.
                </p>
                <div className="placeholder-features">
                  <div className="feature-item">
                    <span className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>View ticket details</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>Respond to users</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 7V12L15 15" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>Update ticket status</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSupport;

