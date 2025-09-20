/**
 * @file Search.js
 * @summary Handles transaction search, filtering, sorting, creation, editing, and deletion in one interface.  
 * Includes reset functionality, kebab menus for transaction options, and dynamic input form toggling.  
 * Communicates with backend routes for real-time user-specific transaction management.
 * Adds flag toggling and per-account filtering based on URL, and allows manual inserts using real accountId.
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './Search.css';

function Search({ manualAccountId }) {
  const { t } = useTranslation('transactions');
  void t;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [sort, setSort] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [manualAmount, setManualAmount] = useState('');
  const [manualCategory, setManualCategory] = useState('');
  const [manualType, setManualType] = useState('expense');
  const [manualDate, setManualDate] = useState('');
  const [manualName, setManualName] = useState('');

  const [manualAccounts, setManualAccounts] = useState([]);


  const [accountOptions, setAccountOptions] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(accountId || '');

  const isMounted = useRef(false);

  const privacyMode = localStorage.getItem('privacyMode') === 'true';
  
  useEffect(() => {
    if (privacyMode) {
      fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-accounts`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setManualAccounts(data || []))
        .catch(err => console.error('Failed to load manual accounts:', err));
    } else {
      fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/user-accounts`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setAccountOptions(data || []))
        .catch(err => console.error('Failed to load accounts:', err));
    }
  }, [privacyMode]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleReimbursementRequest = (tx) => {
    navigate('/reimbursement-request', { state: { transaction: tx } });
  };

  const handleDeleteTransaction = async (id) => {
    let url;
    if (privacyMode && manualAccountId) {
      url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-transactions/${id}`;
    } else {
      url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions/${id}`;
    }
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete transaction.');
      await handleSearch();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleFlag = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions/flag/${id}`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setResults(prev =>
          prev.map(tx =>
            tx.id === id ? { ...tx, isFlagged: data.isFlagged } : tx
          )
        );
      } else {
        console.error('Flag error:', data.error);
      }
    } catch (err) {
      console.error('Toggle flag failed:', err);
    }
  };

  const handleSearch = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    let url, params = new URLSearchParams();

    if (privacyMode && manualAccountId) {
      url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-transactions/${manualAccountId}`;
    } else {
      if (query.trim()) params.append('query', query);
      if (filterType) params.append('filter', filterType);
      params.append('sort', sort || 'createdAt');
      if (accountId) params.append('accountId', accountId);
      url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions/search?${params.toString()}`;
    }

    try {
      const res = await fetch(url, {
        credentials: 'include'
      });
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error fetching results.');
    } finally {
      setIsLoading(false);
    }
  }, [query, filterType, sort, accountId, privacyMode, manualAccountId]);

  useEffect(() => {
    if (!isMounted.current) {
      handleSearch();
      isMounted.current = true;
    }
  }, [handleSearch]);

  const handleCurrencyConvert = () => {
    navigate('/currency-convert');
  };

  const handleManualTransaction = async (e) => {
    e.preventDefault();
    try {
      const categoryValue = manualType === 'income' ? 'INCOME' : manualCategory;
      let url, body;

      if (privacyMode && manualAccountId) {
        url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-transactions/${manualAccountId}`;
        body = JSON.stringify({
          name: manualName,
          amount: manualAmount,
          date: manualDate,
          note: "",
          type: manualType,
          category: manualCategory
        });
      } else {
        url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions`;
        body = JSON.stringify({
          amount: manualAmount,
          category: categoryValue,
          pfcPrimary: categoryValue,
          type: manualType,
          date: manualDate,
          source: 'manual',
          name: manualName,
          accountName: 'Manually Added',
          accountId: 'manual-entry',
        });
      }

      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Add failed');

      setResults((prevResults) => [data, ...prevResults]);
      await handleSearch();

      setManualAmount('');
      setManualCategory('');
      setManualType('expense');
      setManualDate('');
      setManualName('');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-control-bar">
        <form onSubmit={handleSearch} className="search-box">
          {filterType === 'category' ? (
            <select value={query} onChange={(e) => setQuery(e.target.value)}>
              <option value="">{t('allCategories')}</option>
              <option value="ENTERTAINMENT">{t('entertainment')}</option>
              <option value="GENERAL_MERCHANDISE">{t('generalMerchandise')}</option>
              <option value="FOOD_AND_DRINK">{t('foodAndDrink')}</option>
              <option value="LOAN_PAYMENTS">{t('loanPayments')}</option>
              <option value="TRANSPORTATION">{t('transportation')}</option>
              <option value="GENERAL_SERVICES">{t('generalServices')}</option>
              <option value="PERSONAL_CARE">{t('personalCare')}</option>
              <option value="TRAVEL">{t('travel')}</option>
              <option value="INCOME">{t('income')}</option>
            </select>
          ) : filterType === 'type' ? (
            <select value={query} onChange={(e) => setQuery(e.target.value)}>
              <option value="">{t('allTypes')}</option>
              <option value="income">{t('income')}</option>
              <option value="expense">{t('expense')}</option>
            </select>
          ) : (
            <input type="text" placeholder={t('searchPlaceholder')} value={query} onChange={(e) => setQuery(e.target.value)} />
          )}

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="name">{t('merchant')}</option>
            <option value="category">{t('category')}</option>
            <option value="type">{t('type')}</option>
            <option value="amount">{t('amount')}</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">{t('noSort')}</option>
            <option value="asc">{t('amountLowHigh')}</option>
            <option value="desc">{t('amountHighLow')}</option>
            <option value="newest">{t('dateNewestOldest')}</option>
            <option value="oldest">{t('dateOldestNewest')}</option>
            <option value="flagged">{t('flaggedFirst')}</option>
          </select>

          <button type="submit" disabled={isLoading}>{isLoading ? t('searching') : t('search')}</button>
        </form>

        <div className="add-box">
          <button onClick={handleCurrencyConvert} className="currency-convert-btn">
            <img src="/navbar-icons/currencyConverter.png" alt="Currency Converter" className="currency-icon" />
            Convert
          </button>
        </div>
      </div>

      <div className="add-transaction-form">
        <form onSubmit={handleManualTransaction}>
          <select value={selectedAccountId} onChange={(e) => setSelectedAccountId(e.target.value)} required>
            <option value="">Select Account</option>
            {privacyMode
              ? manualAccounts.map(acc => (
                  <option key={acc.manualAccountId} value={acc.manualAccountId}>{acc.accountName}</option>
                ))
              : accountOptions.map(acc => (
                  <option key={acc.accountId} value={acc.accountId}>{acc.name}</option>
                ))}
          </select>

          <input type="text" placeholder={t('merchant')} value={manualName} onChange={e => setManualName(e.target.value)} required />
          <input type="number" placeholder={t('amount')} value={manualAmount} onChange={e => setManualAmount(e.target.value)} required />
          <input type="date" value={manualDate} onChange={e => setManualDate(e.target.value)} required />
          <select value={manualType} onChange={e => setManualType(e.target.value)}>
            <option value="expense">{t('expense')}</option>
            <option value="income">{t('income')}</option>
          </select>

          {manualType === 'income' ? (
            <input type="text" value="INCOME" disabled />
          ) : (
            <select value={manualCategory} onChange={e => setManualCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="ENTERTAINMENT">ENTERTAINMENT</option>
              <option value="GENERAL_MERCHANDISE">GENERAL_MERCHANDISE</option>
              <option value="FOOD_AND_DRINK">FOOD_AND_DRINK</option>
              <option value="LOAN_PAYMENTS">LOAN_PAYMENTS</option>
              <option value="TRANSPORTATION">TRANSPORTATION</option>
              <option value="GENERAL_SERVICES">GENERAL_SERVICES</option>
              <option value="PERSONAL_CARE">PERSONAL_CARE</option>
              <option value="TRAVEL">TRAVEL</option>
            </select>
          )}

          <button type="submit">{t('addTransaction')}</button>

        </form>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="transaction-list">
        {results.map((tx) => {
          const id = tx.manualTransactionId || tx.id;
          const type = tx.type || 'expense';
          const category = tx.category || '';
          const pfcPrimary = tx.pfcPrimary || category || '';
          const absAmount = Math.abs(parseFloat(tx.amount)).toFixed(2);
          const sign = type === 'income' ? '+' : '-';
          const formattedDate = new Date(tx.date).toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
          });
          const isManual = tx.manualTransactionId !== undefined || (tx.source && tx.source === 'manual');

          return (
            <div className="transaction-card" key={id}>
              <div className="transaction-top-row">
                <div className="left-details">
                  <div className="transaction-meta">
                    <strong>{tx.name || category || '(No name)'}</strong>
                  </div>
                  <div className="transaction-meta"><strong>{type}</strong></div>
                  <div className="date-inline">{t('date')}: {formattedDate}</div>
                </div>
                <div className="right-section">
                  <div className="amount-category-column">
                    <div className={`amount ${type === 'income' ? 'income' : 'expense'}`}>{sign}${absAmount}</div>
                    <div className="category">{pfcPrimary}</div>
                    <div className="need-want">{tx.needWant || ''}</div>
                  </div>
                  <div className="kebab-wrapper-with-flag">
                    <div className="kebab-wrapper">
                      <button className="kebab-menu" onClick={() => toggleMenu(id)}>⋮</button>
                      {openMenuId === id && (
                        <div className="kebab-dropdown">
                          <button onClick={() => handleReimbursementRequest(tx)}>Reimbursement</button>
                          {isManual && (
                            <button onClick={() => handleDeleteTransaction(id)} style={{ color: 'red' }}>

                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div
                      className="flag-below-kebab"
                      onClick={() => toggleFlag(id)}
                      title={tx.isFlagged ? 'Unflag' : 'Flag'}
                    >
                      {tx.isFlagged ? '🚩' : '⚑'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Search;