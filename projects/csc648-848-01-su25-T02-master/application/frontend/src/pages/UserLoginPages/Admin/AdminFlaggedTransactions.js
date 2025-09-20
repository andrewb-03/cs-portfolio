/**
 * @file AdminFlaggedTransactions.js
 * @summary Admin interface for reviewing and managing flagged transactions.
 * Only accessible to admin users.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AdminFlaggedTransactions.css';

const BACKEND_URL = process.env.REACT_APP_URL_BACKEND_PORT;

function AdminFlaggedTransactions() {
  const { t } = useTranslation('settings');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [flaggedTransactions, setFlaggedTransactions] = useState([]);
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
          
          fetchFlaggedTransactions();
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
        fetchFlaggedTransactions();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [userInfo]);

  const fetchFlaggedTransactions = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/transactions/flagged`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setFlaggedTransactions(data);
      } else {
        console.error('Failed to fetch flagged transactions:', data.error);
      }
    } catch (err) {
      console.error('Error fetching flagged transactions:', err);
    }
  };

  const handleUnflagTransaction = async (transactionId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/transactions/flagged/${transactionId}/unflag`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (res.ok) {
        fetchFlaggedTransactions();
        alert('Transaction unflagged successfully!');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to unflag transaction.');
      }
    } catch (err) {
      console.error('Error unflagging transaction:', err);
      alert('Database connection error. Please try again.');
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
      <div className="admin-flagged-bg">
        <div className="admin-flagged-wrapper">
          <div className="admin-loading">Loading flagged transactions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-flagged-bg">
        <div className="admin-flagged-wrapper">
          <div className="admin-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!userInfo || userInfo.userType !== 'admin') {
    return (
      <div className="admin-flagged-bg">
        <div className="admin-flagged-wrapper">
          <div className="admin-error">Access denied. Admin privileges required.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-flagged-bg">
      <div className="admin-flagged-wrapper">
        {/* Header */}
        <div className="admin-flagged-header">
          <button 
            onClick={() => navigate('/admin')}
            className="back-button"
          >
            ← Back to Admin Panel
          </button>
          <h1 className="admin-flagged-title">Flagged Transactions</h1>
          <p className="admin-flagged-subtitle">Review and manage flagged transactions</p>
        </div>

        {/* Content */}
        <div className="admin-flagged-content">
          <div className="flagged-section">
            <div className="section-header">
              <h2 className="section-title">All Flagged Transactions ({flaggedTransactions.length})</h2>
            </div>
            
            {flaggedTransactions.length === 0 ? (
              <div className="no-flagged">No flagged transactions found.</div>
            ) : (
              <div className="flagged-list">
                {flaggedTransactions.map(transaction => (
                  <div key={transaction.id} className="flagged-item">
                    <div className="flagged-header">
                      <h3 className="flagged-description">{transaction.description || transaction.name || 'Unnamed Transaction'}</h3>
                      <span className="flagged-amount">{formatCurrency(transaction.amount)}</span>
                    </div>
                    <div className="flagged-details">
                      <p><strong>User:</strong> {transaction.userName} ({transaction.userEmail})</p>
                      <p><strong>Category:</strong> {transaction.category || 'Uncategorized'}</p>
                      <p><strong>Type:</strong> {transaction.type}</p>
                      <p><strong>Date:</strong> {formatDate(transaction.createdAt)}</p>
                    </div>
                    <div className="flagged-actions">
                      <button
                        className="unflag-btn"
                        onClick={() => handleUnflagTransaction(transaction.id)}
                      >
                        Unflag Transaction
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFlaggedTransactions;

