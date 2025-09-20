 
import React, { useState, useEffect } from 'react';
import useDropdown from './popUp';
import AuthGate from '../../../components/AuthGate';

function DashTrans() {
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [subscriptions, setSubscriptions] = useState([]);

  const {
    dropdownVisible,
    isEditing,
    setIsEditing,
    editedNote,
    setEditedNote,
    cancelledSubscriptions,
    showCancelConfirm,
    subscriptionToCancel,
    toggleDropdown,
    handleEdit,
    handleCancelClick,
    confirmCancel,
    cancelCancel,
    handleSave
  } = useDropdown();

  // Fetch subscriptions from Plaid Subscription table
  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/subscriptions`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        console.log('📊 Fetched Plaid subscriptions:', data);
        setSubscriptions(data);
      } catch (err) {
        console.error('❌ Error loading subscriptions:', err);
      }
    };
    getSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (activeSubTab === 'weekly') return sub.frequency === 'WEEKLY';
    if (activeSubTab === 'monthly') return sub.frequency === 'MONTHLY';
    if (activeSubTab === 'yearly') return sub.frequency === 'YEARLY';
    return true;
  });

  // Debug log to check cancelled subscriptions
  console.log('Current cancelled subscriptions:', Array.from(cancelledSubscriptions));

  const getFrequencyColor = (frequency) => {
    switch (frequency.toLowerCase()) {
      case 'weekly': return '#6B7280';
      case 'monthly': return '#6B7280';
      case 'yearly': return '#6B7280';
      default: return '#6B7280';
    }
  };



  return (
    <AuthGate>
      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <p>Cancel subscription to <strong>{subscriptionToCancel?.name}</strong>?</p>
            </div>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-secondary" onClick={cancelCancel}>
                Keep
              </button>
              <button className="modal-btn modal-btn-danger" onClick={confirmCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="subscriptions-container">
        {/* Header Section */}
        <div className="subscriptions-header">
          <div className="subscriptions-header-content">
            <h1 className="subscriptions-title">Subscriptions</h1>
            <p className="subscriptions-subtitle">Manage your recurring payments</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="subscriptions-filters">
          <button 
            className={`filter-button ${activeSubTab === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveSubTab('all')}
          >
            All ({subscriptions.length})
          </button>
          <button 
            className={`filter-button ${activeSubTab === 'weekly' ? 'active' : ''}`} 
            onClick={() => setActiveSubTab('weekly')}
          >
            Weekly ({subscriptions.filter(s => s.frequency === 'WEEKLY').length})
          </button>
          <button 
            className={`filter-button ${activeSubTab === 'monthly' ? 'active' : ''}`} 
            onClick={() => setActiveSubTab('monthly')}
          >
            Monthly ({subscriptions.filter(s => s.frequency === 'MONTHLY').length})
          </button>
          <button 
            className={`filter-button ${activeSubTab === 'yearly' ? 'active' : ''}`} 
            onClick={() => setActiveSubTab('yearly')}
          >
            Yearly ({subscriptions.filter(s => s.frequency === 'YEARLY').length})
          </button>
        </div>

        {/* Subscriptions Grid */}
        <div className="subscriptions-content">
          {filteredSubscriptions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12h6"/>
                  <path d="M9 16h6"/>
                  <path d="M10 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10z"/>
                </svg>
              </div>
              <h3 className="empty-title">No subscriptions found</h3>
              <p className="empty-description">
                Your subscription data will appear here once you have recurring payments connected to your accounts.
              </p>
            </div>
          ) : (
            <div className="subscriptions-grid">
              {filteredSubscriptions.map((sub) => (
                <div 
                  className={`subscription-card ${cancelledSubscriptions.has(sub.subscriptionId) ? 'cancelled' : ''}`} 
                  key={sub.subscriptionId}
                >
                                      <div className="subscription-card-header">
                      <div className="subscription-info">
                        <h3 className="subscription-merchant">{sub.merchantName}</h3>
                        <div className="subscription-frequency" style={{ color: getFrequencyColor(sub.frequency) }}>
                          {sub.frequency}
                        </div>
                        {cancelledSubscriptions.has(sub.subscriptionId) && (
                          <div className="cancelled-badge">Cancelled</div>
                        )}
                      </div>
                    <div className="subscription-header-right">
                      <div className="subscription-amount">
                        -${(sub.averageAmount / 100).toFixed(2)}
                      </div>
                      <div className="subscription-dropdown">
                        <button 
                          className="dropdown-toggle"
                          onClick={() => toggleDropdown(sub.subscriptionId)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"/>
                            <circle cx="19" cy="12" r="1"/>
                            <circle cx="5" cy="12" r="1"/>
                          </svg>
                        </button>
                        {dropdownVisible === sub.subscriptionId && (
                          <div className="dropdown-menu">
                            <button 
                              className="dropdown-item edit-item"
                              onClick={() => handleEdit(sub.subscriptionId, 'Edit note feature coming soon')}
                            >
                              <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Edit
                            </button>
                            <button 
                              className="dropdown-item cancel-item"
                              onClick={() => {
                                console.log('Cancel button clicked for subscription:', sub.subscriptionId);
                                handleCancelClick(sub.subscriptionId, sub.merchantName);
                              }}
                            >
                              <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                              </svg>
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="subscription-card-body">
                    <div className="subscription-details">
                      <div className="detail-row">
                        <span className="detail-label">First Payment:</span>
                        <span className="detail-value">
                          {new Date(sub.firstDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Last Payment:</span>
                        <span className="detail-value">
                          {new Date(sub.lastDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Notes:</span>
                        <span className="detail-value">
                          {isEditing === sub.subscriptionId ? (
                            <div className="note-edit">
                              <input
                                className="note-input"
                                type="text"
                                value={editedNote}
                                onChange={(e) => setEditedNote(e.target.value)}
                                placeholder="Add a note..."
                              />
                              <button className="note-save-btn" onClick={handleSave}>Save</button>
                            </div>
                          ) : (
                            <span className="note-text">Click to add note</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGate>
  );
}

export default DashTrans;

// ==============================================
// PAGE SPECIFIC CSS
// ==============================================
const style = document.createElement('style');
style.textContent = `
.dashboard-bg {
  background: linear-gradient(180deg, #54BF3F 0%, #FFE550 100%);
  min-height: 100vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed;
}
.dashtrans-wrapper {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 1.5rem;
  width: 65vw;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 900px) {
  .dashtrans-wrapper {
    width: 90vw;
    min-width: 0;
    max-width: 100vw;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (max-width: 700px) {
  .dashtrans-wrapper {
    width: 98vw;
    min-width: 0;
    max-width: 100vw;
    padding: 1rem 0.5rem;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Subscriptions Section Styles */
.subscriptions-container {
  background: #ffffff;
  min-height: 100vh;
  padding: 2rem;
}
.subscriptions-header {
  background: #fff;
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid #e2e8f0;
}
.subscriptions-header-content h1 {
  font-size: 2.5rem;
  color: #1c8536;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}
.subscriptions-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}
.subscriptions-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.filter-button {
  background: #fff;
  color: #666;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.filter-button.active {
  background: #1c8536;
  color: #fff;
  border-color: #1c8536;
  box-shadow: 0 4px 16px rgba(28, 133, 54, 0.3);
}
.subscriptions-content {
  max-width: 1200px;
  margin: 0 auto;
}
.empty-state {
  background: #fff;
  border-radius: 1.5rem;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}
.empty-icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}
.empty-icon svg {
  width: 4rem;
  height: 4rem;
  color: #94a3b8;
  opacity: 0.7;
}
.empty-title {
  font-size: 1.5rem;
  color: #1c1c1c;
  margin: 0 0 1rem 0;
  font-weight: 600;
}
.empty-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}
.subscriptions-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.subscription-card {
  background: #f8fafc;
  border-radius: 0.8rem;
  padding: 1.5rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 100%;
}
.subscription-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f1f5f9;
}
.subscription-info {
  flex: 1;
}
.subscription-merchant {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1c1c1c;
  margin: 0 0 0.2rem 0;
}
.subscription-frequency {
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.subscription-header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.subscription-amount {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e74c3c;
  text-align: right;
}
.subscription-dropdown {
  position: relative;
}
.dropdown-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
.dropdown-toggle:hover {
  background: #f1f5f9;
}
.dropdown-toggle svg {
  width: 16px;
  height: 16px;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 10;
  margin-top: 0.3rem;
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.85rem;
  color: #374151;
  text-align: left;
}
.dropdown-item:hover {
  background: #f8fafc;
}
.dropdown-item:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}
.dropdown-item:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}
.dropdown-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.edit-item {
  color: #1c8536;
}
.cancel-item {
  color: #dc2626;
}
.subscription-card-body {
  margin-bottom: 1rem;
}
.subscription-details {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
}
.detail-label {
  font-size: 0.9rem;
  color: black;
  font-weight: 500;
}
.detail-value {
  font-size: 0.9rem;
  color: #1c1c1c;
  font-weight: 600;
}
.note-edit {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.note-input {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  background: #f8fafc;
}
.note-input:focus {
  outline: none;
  border-color: #1c8536;
  background: #fff;
}
.note-save-btn {
  background: #1c8536;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}
.note-save-btn:hover {
  background: #16a34a;
}
.note-text {
  color: #666;
  font-style: italic;
  cursor: pointer;
  transition: color 0.2s ease;
}
.note-text:hover {
  color: #1c8536;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 0.8rem;
  padding: 1.5rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.modal-body {
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-body p {
  font-size: 1rem;
  color: #374151;
  margin: 0;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
}

.modal-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
  min-width: 80px;
}

.modal-btn-secondary {
  background: #fff;
  color: #666;
}

.modal-btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.modal-btn-danger {
  background: #dc2626;
  color: #fff;
  border-color: #dc2626;
}

.modal-btn-danger:hover {
  background: #b91c1c;
  border-color: #b91c1c;
}

/* Cancelled Subscription Styles */
.subscription-card.cancelled {
  background: #f8f9fa;
  opacity: 0.7;
  border: 1px solid #e5e7eb;
}

.subscription-card.cancelled .subscription-merchant {
  color: #6b7280;
  text-decoration: line-through;
}

.subscription-card.cancelled .subscription-amount {
  color: #9ca3af;
}

.subscription-card.cancelled .subscription-frequency {
  color: #9ca3af !important;
}

.cancelled-badge {
  background: #dc2626;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.5rem;
  display: inline-block;
}
@media (max-width: 768px) {
  .subscriptions-container {
    padding: 1rem;
  }
  .subscriptions-header {
    padding: 1.5rem;
  }
  .subscriptions-header-content h1 {
    font-size: 2rem;
  }
  .subscriptions-filters {
    gap: 0.5rem;
  }
  .filter-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  .subscriptions-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .subscription-card {
    padding: 1.5rem;
  }
  .subscription-card-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  .subscription-amount {
    text-align: center;
  }
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
  .subscription-card-actions {
    flex-direction: column;
  }
}
@media (max-width: 480px) {
  .subscriptions-header-content h1 {
    font-size: 1.8rem;
  }
  .subscriptions-subtitle {
    font-size: 1rem;
  }
  .subscription-card {
    padding: 1rem;
  }
  .subscription-merchant {
    font-size: 1.1rem;
  }
  .subscription-amount {
    font-size: 1.3rem;
  }
  .modal-content {
    padding: 1rem;
    margin: 1rem;
  }
  .modal-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  .modal-btn {
    min-width: auto;
    width: 100%;
  }
}
`;
document.head.appendChild(style);

