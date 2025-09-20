/**
 * @file Accounts.js
 * @summary Displays grouped bank account data fetched from Plaid, organized into collapsible dropdowns by type.  
 * Allows linking new accounts via Plaid and navigates to the transactions page on sub-account click.  
 * Calculates totals per group, supports interactive dropdown toggling, and ensures auth protection.
 */

import React, { useEffect, useState } from "react";
import "./Styles.css";
import { useNavigate } from 'react-router-dom';
import AddAccount from './addAccount';
import AuthGate from '../../../components/AuthGate';
import PlaidLinkButton from '../../../components/PlaidLinkButton';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Accounts() {
  const { t } = useTranslation('transactions');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [showAddAccount, setShowAddAccount] = useState(false);

  const privacyMode = localStorage.getItem('privacyMode') === 'true';

  const [manualAccounts, setManualAccounts] = useState([]);
  const [manualTransactions, setManualTransactions] = useState([]);
  const [refreshManual, setRefreshManual] = useState(false);

  useEffect(() => {
    if (privacyMode) {
      axios.get(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-accounts`, { withCredentials: true })
        .then(res => setManualAccounts(res.data))
        .catch(() => setManualAccounts([]));
      axios.get(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-transactions/all`, { withCredentials: true })
        .then(res => setManualTransactions(res.data))
        .catch(() => setManualTransactions([]));
    } else {
      axios.get(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/user-accounts`, { withCredentials: true })
        .then(res => setAccounts(res.data))
        .catch(() => setAccounts([]));
    }
  }, [privacyMode, showAddAccount, refreshManual]);

  const getTotal = (arr) => {
    const total = arr.reduce((sum, val) => {
      const value = typeof val.value === 'number' ? val.value : 0;
      return sum + value;
    }, 0);
    return total.toFixed(2);
  };

  const getManualTotal = (manualAccountId) => {
    console.log("Calculating total for manualAccountId:", manualAccountId);
    console.log("manualTransactions:", manualTransactions);
    if (!manualTransactions || !manualTransactions.length) return 0;
    const total = manualTransactions
      .filter(tx => String(tx.manualAccountId) === String(manualAccountId))
      .reduce((sum, tx) => {
        if (tx.type === 'income') return sum + parseFloat(tx.amount);
        else return sum - parseFloat(tx.amount);
      }, 0);
    console.log("Total for manualAccountId:", manualAccountId, "is", total);
    return total;
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const grouped = accounts.reduce((acc, item) => {
    const label = formatLabel(item.type, item.subtype);
    if (!acc[label]) acc[label] = [];
    acc[label].push({
      name: item.name || item.officialName,
      value: parseFloat(item.balance) || 0,
      accountId: item.accountId
    });
    return acc;
  }, {});

  const groupedManual = manualAccounts.reduce((acc, item) => {
    const label = item.accountType || "Other";
    if (!acc[label]) acc[label] = [];
    acc[label].push({
      name: item.accountName,
      value: getManualTotal(item.manualAccountId),
      accountId: item.manualAccountId
    });
    return acc;
  }, {});

  const handleAddManualAccount = () => {
    setShowAddAccount(false);
    setRefreshManual(r => !r);
  };

  const handleDeleteManualAccount = async (accountId) => {
    await axios.delete(
      `${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-accounts/${accountId}`,
      { withCredentials: true }
    );
    setRefreshManual(r => !r);
  };

  console.log("manualAccounts:", manualAccounts);
  console.log("manualTransactions:", manualTransactions);

  return (
    <div className="accounts-wrapper">
      <main className="accounts-main">
        <div className="savings-heading-card">
          <h1 className="savings-section-title">{t('accountsTitle')}</h1>
        </div>

        {privacyMode ? (
          <>
            {Object.entries(groupedManual).length === 0 && (
              <div style={{ margin: "2rem 0", textAlign: "center", color: "#888" }}>
                No accounts have been added.
              </div>
            )}
            {Object.entries(groupedManual).map(([label, items]) => (
              <DropdownSection
                key={label}
                label={label}
                total={`$${getTotal(items)}`}
                isOpen={openDropdown === label}
                toggle={() => toggleDropdown(label)}
                items={items}
                privacyMode={privacyMode}
                onDeleteManual={handleDeleteManualAccount}
              />
            ))}
            <div>
              <button
                className="add-account-submit"
                onClick={() => setShowAddAccount(true)}
              >
                + Add Account
              </button>
            </div>
            <AddAccount
              open={showAddAccount}
              onClose={() => setShowAddAccount(false)}
              onAccountAdded={handleAddManualAccount}
            />
          </>
        ) : (
          <>
            {Object.entries(grouped).map(([label, items]) => (
              <DropdownSection
                key={label}
                label={label}
                total={`$${getTotal(items)}`}
                isOpen={openDropdown === label}
                toggle={() => toggleDropdown(label)}
                items={items}
              />
            ))}
            <div>
              <PlaidLinkButton onSuccessImport={() => window.location.reload()} />
            </div>
            <AddAccount open={showAddAccount} onClose={() => setShowAddAccount(false)} />
          </>
        )}
      </main>
    </div>
  );
}

function formatLabel(type = '', subtype = '') {
  const t = type.toLowerCase();
  const s = subtype.toLowerCase();

  if (t === 'depository') {
    if (s === 'checking') return 'Checking';
    if (['savings', 'money market'].includes(s)) return 'Savings';
  }

  if (t === 'credit') return 'Loans';
  if (['loan'].includes(t) || ['student', 'auto'].includes(s)) return 'Loans';
  if (['investment', 'brokerage', '401k', 'cd'].includes(s)) return 'Investments';
  if (['hsa'].includes(s)) return 'Health Savings';

  return 'Other';
}

function DropdownSection({ label, total, isOpen, toggle, items, privacyMode, onDeleteManual }) {
  const navigate = useNavigate();

  const handleClick = (accountId) => {
    if (!privacyMode && accountId) {
      navigate(`/transactions?accountId=${accountId}`);
    } else if (privacyMode && accountId) {
      navigate(`/transactions?manualAccountId=${accountId}`);
    }
  };

  return (
    <AuthGate>
      <div className="account-group">
        <div className={`account-card account-row ${isOpen ? "no-bottom-radius" : ""}`}>
          <div className="account-left">
            <div className="account-name">{label}</div>
            <div className="account-balance">{total}</div>
          </div>
          <div className="account-right" onClick={toggle}>
            <span className={`account-toggle-arrow ${isOpen ? "open" : ""}`}>˅</span>
          </div>
        </div>

        {isOpen && (
          <div className="dropdown-border-wrapper">
            {items.map((item, index) => (
              <div
                key={index}
                className="account-card nested-card"
                onClick={() => handleClick(item.accountId)}
                style={{ cursor: "pointer" }}
              >
                <div className="account-left">
                  <div className="account-name">{item.name}</div>
                  <div className="account-balance">
                    ${parseFloat(item.value).toFixed(2)}
                  </div>
                </div>
                {privacyMode && onDeleteManual && (
                  <button
                    className="manual-account-delete"
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteManual(item.accountId);
                    }}
                    style={{
                      marginLeft: "auto",
                      background: "none",
                      border: "none",
                      color: "red",
                      fontSize: "1.2rem",
                      cursor: "pointer"
                    }}
                    title="Delete account"
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGate>
  );
}

DropdownSection.propTypes = {
  label: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      accountId: PropTypes.string.isRequired,
    })
  ).isRequired,
};