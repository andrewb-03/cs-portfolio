// ==============================================
// ADD ACCOUNT POPPUP
// ==============================================

/**
 * @file AddAccount.js
 * @summary Renders a simple form to collect routing number and SSN suffix for account linking (no backend).  
 * Includes inline styling and a placeholder alert for submission, protected by AuthGate.  
 * Styled as a centered card on a bright background with labeled input fields.
 */

import React, { useState } from 'react';

function AddAccount({ open, onClose, onAccountAdded}) {
  const accountTypeOptions = [
    "Loans",
    "Savings",
    "Investments",
    "Health Savings",
    "Checking",
    "Other"
  ];
  const [accountType, setAccountType] = useState(accountTypeOptions[0]);
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ accountType, accountName })
      });

      if (res.ok) {
        const data = await res.json();
        if (onAccountAdded) onAccountAdded(data);
        setAccountName('');
        setAccountType(accountTypeOptions[0]);
        onClose();
      } else {
        alert("Failed to add account");
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="add-account-popup-overlay" onClick={onClose}>
      <div className="add-account-popup-card" onClick={e => e.stopPropagation()}>
        <h2 className="add-account-popup-title">Add Account</h2>
        <form onSubmit={handleSubmit} className="add-account-popup-form">
          <label className="add-account-popup-label">
            Account Type
            <select
              className="add-account-popup-input"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              {accountTypeOptions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="add-account-popup-label">
            Account Name
            <input
              type="text"
              className="add-account-popup-input"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </label>
          <div className="add-account-popup-btn-row">
            <button type="submit" className="add-account-popup-submit" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
            <button type="button" className="add-account-popup-close" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAccount;

// ==============================================
// PAGE SPECIFIC CSS
// ==============================================

const style = document.createElement('style');
style.textContent = `
.add-account-popup-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-account-popup-card {
  background: white;
  padding: 2.3rem;
  width: 430px;
  max-width: 96vw;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 1rem;
  box-shadow: 0 0 32px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-account-popup-title {
  font-size: 1.3rem;
  color: #1C8536;
  margin-bottom: 1.1rem;
  text-align: center;
  font-weight: 700;
}
.add-account-popup-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
}
.add-account-popup-label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 1rem;
}
.add-account-popup-input {
  padding: 0.9rem;
  font-size: 1.05rem;
  border-radius: 0.7rem;
  border: 1px solid #bbb;
  margin-top: 0.38rem;
}
.add-account-popup-btn-row {
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  margin-top: 1.2rem;
}
.add-account-popup-submit {
  background: #1C8536;
  color: white;
  border: none;
  border-radius: 0.8rem;
  padding: 1rem 2.2rem;
  font-size: 1.07rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.add-account-popup-submit:hover {
  background: #17562a;
}
.add-account-popup-close {
  background: #eeeeee;
  color: #1C8536;
  border: none;
  border-radius: 0.8rem;
  padding: 1rem 2.2rem;
  font-size: 1.07rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.add-account-popup-close:hover {
  background: #e2e2e2;
  color: #17562a;
}
`;
document.head.appendChild(style);