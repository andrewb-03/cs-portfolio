import React, { useState, useEffect } from 'react';
import './ReimbursementRequest.css';
import AuthGate from '../../../../../components/AuthGate';
import { useTranslation } from 'react-i18next';

export default function ReimbursementRequest() {
  const { t } = useTranslation('reimburse');

  const [formData, setFormData] = useState({
    recipientEmail: '',
    amount: '',
    notes: '',
    type: 'request', // 'request' or 'send'
    selectedAccountId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  // Fetch user accounts on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoadingAccounts(true);
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/user-accounts`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const accountsData = await response.json();
          setAccounts(accountsData);
          // Set the first account as default if available
          if (accountsData.length > 0) {
            setFormData(prev => ({
              ...prev,
              selectedAccountId: accountsData[0].accountId
            }));
          }
        } else {
          console.error('Failed to fetch accounts');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reimbursements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          recipientEmail: formData.recipientEmail,
          amount: parseFloat(formData.amount),
          notes: formData.notes,
          type: formData.type,
          accountId: formData.selectedAccountId
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (formData.type === 'request') {
          setSubmitMessage(t('successRequest'));
        } else {
          setSubmitMessage(t('successSend'));
        }
        // Reset form after successful submission
        setFormData({
          recipientEmail: '',
          amount: '',
          notes: '',
          type: 'request'
        });
      } else {
        setSubmitError(data.message || t('errorSubmit'));
      }
    } catch (error) {
      console.error('Error submitting reimbursement request:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthGate>
      <div className="reimbursement-layout-wrapper">
        <div className="reimbursement-layout-column">
          <div className="reimbursement-title-card">
            <h2 className="text-2xl font-bold text-[#1C8536] text-center">{t('sendOrRequestMoney')}</h2>
            <p className="text-center text-gray-600 mt-2">
              {t('sendOrRequestDescription')}
            </p>
          </div>

          <div className="reimbursement-content-card">
            {submitMessage && (
              <div className="success-message" style={{ 
                backgroundColor: '#d4edda', 
                color: '#155724', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '15px' 
              }}>
                {submitMessage}
              </div>
            )}
            
            {submitError && (
              <div className="error-message" style={{ 
                backgroundColor: '#f8d7da', 
                color: '#721c24', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '15px' 
              }}>
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="reimbursement-form">
              <div className="form-group">
                <label className="form-label">{t('transactionType')}</label>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="type"
                      value="request"
                      checked={formData.type === 'request'}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <span>{t('requestMoney')}</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="type"
                      value="send"
                      checked={formData.type === 'send'}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <span>{t('sendMoney')}</span>
                  </label>
                </div>
                <small className="text-gray-500">
                  {formData.type === 'request' 
                    ? t('requestMoneyDescription')
                    : t('sendMoneyDescription')
                  }
                </small>
              </div>

              {formData.type === 'send' && (
                <div className="form-group">
                  <label htmlFor="selectedAccountId" className="form-label">{t('selectAccount')}</label>
                  {loadingAccounts ? (
                    <div className="text-gray-500">Loading accounts...</div>
                  ) : accounts.length === 0 ? (
                    <div className="text-red-500">{t('noAccountsAvailable')}</div>
                  ) : (
                    <select
                      id="selectedAccountId"
                      name="selectedAccountId"
                      value={formData.selectedAccountId}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      disabled={isSubmitting}
                    >
                      {accounts.map(account => (
                        <option key={account.accountId} value={account.accountId}>
                          {account.name || account.officialName} - ${account.balance}
                        </option>
                      ))}
                    </select>
                  )}
                  <small className="text-gray-500">{t('chooseAccount')}</small>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="recipientEmail" className="form-label">
                  {t('recipientEmail')}
                </label>
                <input
                  type="email"
                  id="recipientEmail"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={t('recipientEmailPlaceholder')}
                  required
                  disabled={isSubmitting}
                />
                <small className="text-gray-500">{t('recipientMustHaveAccount')}</small>
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="form-label">{t('amountUSD')}</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                  disabled={isSubmitting}
                />
                <small className="text-gray-500">
                  {formData.type === 'request' 
                    ? t('amountRequesting')
                    : t('amountDeducted')
                  }
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">{t('notesOptional')}</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={t('notesPlaceholder')}
                  rows="3"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                style={{
                  backgroundColor: '#1C8536',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  width: '100%',
                  marginTop: '20px'
                }}
              >
                {isSubmitting 
                  ? (formData.type === 'request' ? t('sendingRequest') : t('sendingMoney'))
                  : (formData.type === 'request' ? t('submitRequest') : t('submitSend'))
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
