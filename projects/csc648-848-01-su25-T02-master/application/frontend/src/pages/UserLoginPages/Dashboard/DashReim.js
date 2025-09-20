 

/**
 * @file DashReim.js
 * @summary Displays a sorted list of reimbursement requests prioritized by amount and recency.  
 * Calculates a dynamic score for each entry to visually order urgent or high-value items first.  
 * Pulls request data from the backend and renders detailed status, sender, date, and notes.
 */

import React, { useEffect, useState } from 'react';
import './DashReim.css';
import AuthGate from '../../../components/AuthGate';
import { useTranslation } from 'react-i18next';

function getPriorityScore(item) {
  const recencyWeight = 0.7;
  const amountWeight = 0.3;
  
  const daysSinceCreated = (Date.now() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24);
  const recencyScore = Math.max(0, 30 - daysSinceCreated) / 30;
  const amountScore = Math.min(1, parseFloat(item.amount) / 1000);
  
  return recencyWeight * recencyScore + amountWeight * amountScore;
}

function DashReim() {
  const { t } = useTranslation('dashboard'); // ✅ Correct: inside component

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/reimbursements`;
        console.log('Fetching reimbursements from:', url);

        const response = await fetch(url, { credentials: 'include' });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Get current user ID from the first request (all requests will have the current user as sender or recipient)
        if (data.length > 0) {
          const firstRequest = data[0];
          // Determine current user ID from the request data
          const userId = firstRequest.senderId || firstRequest.recipientId;
          setCurrentUserId(userId);
        }
        
        const scored = data
          .map(item => ({ ...item, score: getPriorityScore(item) }))
          .sort((a, b) => b.score - a.score);
        
        setRequests(scored);
        setError('');
      } catch (err) {
        console.error('Error loading reimbursements:', err);
        setError('Failed to load reimbursement requests');
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReimbursements();
  }, []);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reimbursements/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update the local state
        setRequests(prevRequests => 
          prevRequests.map(req => 
            req.requestId === requestId 
              ? { ...req, status: newStatus }
              : req
          )
        );
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleCancel = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel this reimbursement request?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reimbursements/${requestId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        // Remove from local state
        setRequests(prevRequests => 
          prevRequests.filter(req => req.requestId !== requestId)
        );
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to cancel request');
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
      alert('Network error. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      case 'pending':
      default:
        return '#ffc107';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const isSender = (request) => {
    return request.senderId === currentUserId;
  };

  const isRecipient = (request) => {
    return request.recipientId === currentUserId;
  };

  return (
    <AuthGate>
      <div className="dashreimburse-wrapper">
        <h2 className="dashreimburse-title">{t('reimbursementsTitle')}</h2>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {t('loadingReimbursements')}
          </div>
        )}
        
        {error && (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            borderRadius: '4px',
            margin: '10px 0'
          }}>
            {t('errorLoadingReimbursements')}
          </div>
        )}
        
        {!loading && !error && requests.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            color: '#6c757d',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            margin: '10px 0'
          }}>
            {t('noReimbursements')}
          </div>
        )}
        
        {requests.map((req) => (
          <div key={req.requestId} className="dashreimburse-card">
            <div className="dashreimburse-content">
              <div 
                className="dashreimburse-status" 
                style={{ 
                  backgroundColor: getStatusColor(req.status),
                  color: req.status === 'pending' ? '#000' : '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '8px'
                }}
              >
                {req.status}
              </div>
              
              <div className="dashreimburse-line">
                <strong>{t('type')}:</strong> {isSender(req) ? t('typeSent') : t('typeReceived')}
              </div>
              
              {isSender(req) ? (
                <div className="dashreimburse-line">
                  <strong>{t('to')}:</strong> {req.recipientName || req.recipientEmail}
                </div>
              ) : (
                <div className="dashreimburse-line">
                  <strong>{t('from')}:</strong> {req.senderName}
                </div>
              )}
              
              <div className="dashreimburse-line">
                <strong>{t('date')}:</strong> {formatDate(req.date)}
              </div>
              
              {req.notes && (
                <div className="dashreimburse-line">
                  <strong>{t('notes')}:</strong> {req.notes}
                </div>
              )}
            </div>
            
            <div className="dashreimburse-actions">

            <div className="dashreimburse-amount">
              ${parseFloat(req.amount).toFixed(2)}
            </div>

            <div className="dashreimburse-flag" onClick={async () => {
              try {
                const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reimbursements/flag/${req.requestId}`, {
                  method: 'PATCH',
                  credentials: 'include'
                });
                const data = await res.json();
                if (res.ok) {
                  setRequests(prev =>
                    prev.map(r =>
                      r.requestId === req.requestId
                        ? { ...r, isFlagged: data.isFlagged }
                        : r
                    )
                  );
                } else {
                  console.error('Flag update failed:', data.error);
                }
              } catch (err) {
                console.error('Flag error:', err);
              }
            }}>
              {req.isFlagged ? '🚩' : '🏳️'}
            </div>
            
              {req.status === 'pending' && (
                <div className="dashreimburse-buttons">
                  {isRecipient(req) && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(req.requestId, 'approved')}
                        style={{
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          marginRight: '4px'
                        }}
                      >
                        {t('approve')}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req.requestId, 'rejected')}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {t('reject')}
                      </button>
                    </>
                  )}
                  
                  {isSender(req) && (
                    <button
                      onClick={() => handleCancel(req.requestId)}
                      style={{
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {t('cancel')}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AuthGate>
  );
}

export default DashReim;
