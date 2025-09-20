/**
 * @file Admin.js
 * @summary Admin panel page for managing users, viewing system statistics, and handling admin tasks.
 * Only accessible to users with admin privileges.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Admin.css';

function Admin() {
  const { t } = useTranslation('settings');

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/me`, {
          credentials: 'include'
        });

        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
          
          // Check if user is admin
          if (userData.userType !== 'admin') {
            setError('Access denied. Admin privileges required.');
          } else {
            // Fetch recent activity for admin
            fetchRecentActivity();
          }
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

  // Auto-refresh recent activity every 30 seconds
  useEffect(() => {
    if (userInfo && userInfo.userType === 'admin') {
      const interval = setInterval(() => {
        fetchRecentActivity();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [userInfo]);

  const fetchRecentActivity = async () => {
    try {
      setActivityLoading(true);
      
      let activities = [];
      
      // Fetch recent support tickets
      const ticketsResponse = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/support-tickets`, {
        credentials: 'include'
      });
      
      if (ticketsResponse.ok) {
        const tickets = await ticketsResponse.json();
        // Add recent support tickets to activities
        tickets.slice(0, 3).forEach(ticket => {
          activities.push({
            id: `ticket-${ticket.ticketId}`,
            type: 'support_ticket',
            title: `New support ticket: ${ticket.subject}`,
            description: `From: ${ticket.email || 'Unknown user'}`,
            time: ticket.createdAt,
            status: ticket.status,
            icon: 'ticket'
          });
        });
      }

      // Fetch flagged transactions
      const flaggedResponse = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions/flagged`, {
        credentials: 'include'
      });
      
      if (flaggedResponse.ok) {
        const flaggedTransactions = await flaggedResponse.json();
        // Add recent flagged transactions to activities
        flaggedTransactions.slice(0, 3).forEach(transaction => {
          activities.push({
            id: `flagged-${transaction.id}`,
            type: 'flagged_transaction',
            title: `Flagged transaction: ${transaction.description}`,
            description: `User: ${transaction.userName} - Amount: $${transaction.amount}`,
            time: transaction.createdAt,
            status: 'flagged',
            icon: 'flag'
          });
        });
      }

      // Fetch recent reimbursement requests
      const reimbursementsResponse = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reimbursements`, {
        credentials: 'include'
      });
      
      if (reimbursementsResponse.ok) {
        const reimbursements = await reimbursementsResponse.json();
        // Add recent reimbursement requests to activities
        reimbursements.slice(0, 3).forEach(reimbursement => {
          activities.push({
            id: `reimbursement-${reimbursement.requestId}`,
            type: 'reimbursement_request',
            title: `New reimbursement request: $${reimbursement.amount}`,
            description: `From: ${reimbursement.senderName} - Status: ${reimbursement.status}`,
            time: reimbursement.date,
            status: reimbursement.status,
            icon: 'money'
          });
        });
      }

      // Sort activities by time (most recent first)
      activities.sort((a, b) => new Date(b.time) - new Date(a.time));
      
      setRecentActivity(activities.slice(0, 5)); // Show last 5 activities
    } catch (err) {
      console.error('Error fetching recent activity:', err);
    } finally {
      setActivityLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'support_ticket':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        );
      case 'flagged_transaction':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
        );
      case 'reimbursement_request':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        );
      case 'user_registration':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        );
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

  

  const handleViewFlaggedTransactions = () => {
    // Navigate to dedicated flagged transactions page
    navigate('/admin/flagged-transactions');
  };

  const handleReviewSupportTickets = () => {
    // Navigate to admin support page
    navigate('/admin/support');
  };

  const handleViewReimbursements = () => {
    // Navigate to dedicated reimbursements page
    navigate('/admin/reimbursements');
  };

  if (loading) {
    return (
      <div className="admin-bg">
        <div className="admin-wrapper">
          <div className="admin-loading">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-bg">
        <div className="admin-wrapper">
          <div className="admin-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!userInfo || userInfo.userType !== 'admin') {
    return (
      <div className="admin-bg">
        <div className="admin-wrapper">
          <div className="admin-error">Access denied. Admin privileges required.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-bg">
      <div className="admin-wrapper">
        {/* Header Section */}
        <div className="admin-header">
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">Welcome, {userInfo.name}</p>
        </div>

        {/* Quick Actions */}
        <div className="admin-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="admin-actions">
            <button className="admin-action-btn" onClick={handleViewFlaggedTransactions}>
              <span className="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
              </span>
              <span className="action-text">Flagged Transactions</span>
            </button>
            <button className="admin-action-btn" onClick={handleReviewSupportTickets}>
              <span className="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </span>
              <span className="action-text">Review Support Tickets</span>
            </button>
            <button className="admin-action-btn" onClick={handleViewReimbursements}>
              <span className="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </span>
              <span className="action-text">Reimbursement Requests</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-section">
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
          </div>
          {activityLoading ? (
            <div className="admin-activity">
              <div className="activity-item">
                <div className="activity-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <p className="activity-text">Loading recent activity...</p>
                  <span className="activity-time">System is ready for monitoring</span>
                </div>
              </div>
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="admin-activity">
              <div className="activity-item">
                <div className="activity-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <p className="activity-text">No recent activity to display</p>
                  <span className="activity-time">System is ready for monitoring</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="admin-activity">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.title}</p>
                    <p className="activity-description">{activity.description}</p>
                    <span className={`activity-status ${getStatusColor(activity.status)}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;

