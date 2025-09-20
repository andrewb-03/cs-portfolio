/**
 * @file AdminReimbursements.js
 * @summary Admin interface for reviewing and managing reimbursement requests.
 * Only accessible to admin users.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AdminReimbursements.css';

const BACKEND_URL = process.env.REACT_APP_URL_BACKEND_PORT;

function AdminReimbursements() {
  const { t } = useTranslation('settings');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reimbursements, setReimbursements] = useState([]);
  const [selectedReimbursement, setSelectedReimbursement] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [reimbursementStatus, setReimbursementStatus] = useState('approved');
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
          
          fetchReimbursements();
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

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (userInfo && userInfo.userType === 'admin') {
      const interval = setInterval(() => {
        fetchReimbursements();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [userInfo]);

  const fetchReimbursements = async () => {
    try {
      console.log('Fetching reimbursements from:', `${BACKEND_URL}/api/reimbursements`);
      const res = await fetch(`${BACKEND_URL}/api/reimbursements`, {
        credentials: 'include',
      });
      console.log('Fetch response status:', res.status);
      const data = await res.json();
      console.log('Fetch response data:', data);
      if (res.ok) {
        setReimbursements(data);
      } else {
        console.error('Failed to fetch reimbursements:', data.error);
      }
    } catch (err) {
      console.error('Error fetching reimbursements:', err);
    }
  };

  const handleReimbursementAction = async (e) => {
    e.preventDefault();
    if (!selectedReimbursement || !adminNotes.trim()) {
      alert('Please enter admin notes');
      return;
    }

    console.log('Submitting admin action:', {
      requestId: selectedReimbursement.requestId,
      status: reimbursementStatus,
      adminNotes,
      adminId: userInfo.userId,
      userInfo: userInfo
    });

    try {
      const res = await fetch(`${BACKEND_URL}/api/reimbursements/${selectedReimbursement.requestId}/admin-action`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          status: reimbursementStatus, 
          adminNotes,
          adminId: userInfo.userId || null
        }),
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        setAdminNotes('');
        setSelectedReimbursement(null);
        fetchReimbursements();
        alert('Reimbursement status updated successfully!');
      } else {
        alert(data.message || data.error || 'Failed to update reimbursement status.');
      }
    } catch (err) {
      console.error('Error updating reimbursement:', err);
      alert('Database connection error. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-reimbursements-bg">
        <div className="admin-reimbursements-wrapper">
          <div className="admin-loading">Loading reimbursement requests...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-reimbursements-bg">
        <div className="admin-reimbursements-wrapper">
          <div className="admin-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!userInfo || userInfo.userType !== 'admin') {
    return (
      <div className="admin-reimbursements-bg">
        <div className="admin-reimbursements-wrapper">
          <div className="admin-error">Access denied. Admin privileges required.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-reimbursements-bg">
      <div className="admin-reimbursements-wrapper">
        {/* Header */}
        <div className="admin-reimbursements-header">
          <button 
            onClick={() => navigate('/admin')}
            className="back-button"
          >
            ← Back to Admin Panel
          </button>
          <h1 className="admin-reimbursements-title">Reimbursement Requests</h1>
          <p className="admin-reimbursements-subtitle">Review and manage reimbursement requests</p>
        </div>

        {/* Content */}
        <div className="admin-reimbursements-content">
          <div className="reimbursements-section">
            <div className="section-header">
              <h2 className="section-title">All Reimbursement Requests ({reimbursements.length})</h2>
            </div>
            
            {reimbursements.length === 0 ? (
              <div className="no-reimbursements">No reimbursement requests found.</div>
            ) : (
              <div className="reimbursements-list">
                {reimbursements.map(reimbursement => (
                  <div 
                    key={reimbursement.requestId}
                    className={`reimbursement-item ${selectedReimbursement?.requestId === reimbursement.requestId ? 'selected' : ''}`}
                    onClick={() => setSelectedReimbursement(reimbursement)}
                  >
                    <div className="reimbursement-header">
                      <h3 className="reimbursement-subject">{formatCurrency(reimbursement.amount)} - {reimbursement.type}</h3>
                      <span className={`reimbursement-status ${getStatusColor(reimbursement.status)}`}>
                        {reimbursement.status}
                      </span>
                    </div>
                    <div className="reimbursement-meta">
                      <p><strong>From:</strong> {reimbursement.senderName} ({reimbursement.senderEmail})</p>
                      <p><strong>To:</strong> {reimbursement.recipientName || 'External'} ({reimbursement.recipientEmail || 'N/A'})</p>
                      <p><strong>Date:</strong> {formatDate(reimbursement.date)}</p>
                    </div>
                    {reimbursement.notes && (
                      <p className="reimbursement-notes">{reimbursement.notes}</p>
                    )}
                    {reimbursement.adminNotes && (
                      <div className="reimbursement-admin-response">
                        <strong>Admin Notes:</strong> {reimbursement.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Response Section */}
          {selectedReimbursement ? (
            <div className="response-section">
              <h2 className="section-title">Review Reimbursement</h2>
              <div className="selected-reimbursement-info">
                <h3>{formatCurrency(selectedReimbursement.amount)} - {selectedReimbursement.type}</h3>
                <p><strong>From:</strong> {selectedReimbursement.senderName} ({selectedReimbursement.senderEmail})</p>
                <p><strong>To:</strong> {selectedReimbursement.recipientName || 'External'} ({selectedReimbursement.recipientEmail || 'N/A'})</p>
                <p><strong>Current Status:</strong> {selectedReimbursement.status}</p>
                <p><strong>Date:</strong> {formatDate(selectedReimbursement.date)}</p>
                {selectedReimbursement.notes && (
                  <p><strong>Notes:</strong> {selectedReimbursement.notes}</p>
                )}
              </div>
              
              <form onSubmit={handleReimbursementAction} className="response-form">
                <div className="form-group">
                  <label htmlFor="status">Update Status:</label>
                  <select
                    id="status"
                    value={reimbursementStatus}
                    onChange={(e) => setReimbursementStatus(e.target.value)}
                    className="status-select"
                  >
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                    <option value="pending">Mark as Pending</option>
                    <option value="completed">Mark as Completed</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="adminNotes">Admin Notes:</label>
                  <textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Enter admin notes for this reimbursement request..."
                    rows={4}
                    className="response-textarea"
                    required
                  />
                </div>
                
                <div className="response-actions">
                  <button type="submit" className="send-response-btn">
                    Update Status
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedReimbursement(null)}
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
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="placeholder-title">Select Reimbursement Request</h2>
                <p className="placeholder-description">
                  Choose a reimbursement request from the list on the left to review details and take action.
                </p>
                <div className="placeholder-features">
                  <div className="feature-item">
                    <span className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>Review request details</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>Approve or reject requests</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#1c8536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>Add admin notes</span>
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

export default AdminReimbursements;

