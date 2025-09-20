/**
 * @file CurrencyConvert.js
 * @summary Provides a UI for real-time currency conversion using mock exchange rates and dropdown selectors.  
 * Allows users to convert between USD, EUR, and JPY with responsive input and periodic rate fluctuation.  
 * Includes dual-field inputs, currency toggles, and a conversion confirmation alert.
 */

import React, { useState, useEffect } from 'react';
import './CurrencyConvert.css';
import AuthGate from '../../../../components/AuthGate';
import { useTranslation } from 'react-i18next';

function CurrencyConvert() {
  const { t } = useTranslation('currency');
  const [leftCurrency, setLeftCurrency] = useState('USD');
  const [rightCurrency, setRightCurrency] = useState('EUR');
  const [leftAmount, setLeftAmount] = useState('');
  const [rightAmount, setRightAmount] = useState('');
  const [showLeftDropdown, setShowLeftDropdown] = useState(false);
  const [showRightDropdown, setShowRightDropdown] = useState(false);
  const [rates, setRates] = useState({
    USD: { EUR: 0.85, JPY: 110.0, USD: 1.0 },
    EUR: { USD: 1.18, JPY: 130.0, EUR: 1.0 },
    JPY: { USD: 0.009, EUR: 0.0077, JPY: 1.0 }
  });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  useEffect(() => {
    const updateRates = () => {
      setRates({
        USD: { EUR: 0.85 + (Math.random() - 0.5) * 0.02, JPY: 110.0 + (Math.random() - 0.5) * 2, USD: 1.0 },
        EUR: { USD: 1.18 + (Math.random() - 0.5) * 0.02, JPY: 130.0 + (Math.random() - 0.5) * 2, EUR: 1.0 },
        JPY: { USD: 0.009 + (Math.random() - 0.5) * 0.0002, EUR: 0.0077 + (Math.random() - 0.5) * 0.0002, JPY: 1.0 }
      });
    };
    const interval = setInterval(updateRates, 30000);
    return () => clearInterval(interval);
  }, []);

  const convertCurrency = (amount, from, to) => {
    if (!amount || from === to) return amount;
    const rate = rates[from]?.[to];
    return rate ? (parseFloat(amount) * rate).toFixed(2) : amount;
  };

  const handleLeftAmountChange = (val) => {
    setLeftAmount(val);
    setRightAmount(val ? convertCurrency(val, leftCurrency, rightCurrency) : '');
  };

  const handleRightAmountChange = (val) => {
    setRightAmount(val);
    setLeftAmount(val ? convertCurrency(val, rightCurrency, leftCurrency) : '');
  };

  const handleLeftCurrencyChange = (code) => {
    setLeftCurrency(code);
    setShowLeftDropdown(false);
    if (leftAmount) {
      setRightAmount(convertCurrency(leftAmount, code, rightCurrency));
    }
  };

  const handleRightCurrencyChange = (code) => {
    setRightCurrency(code);
    setShowRightDropdown(false);
    if (leftAmount) {
      setRightAmount(convertCurrency(leftAmount, leftCurrency, code));
    }
  };

  const handleConvert = () => {
    if (leftAmount && rightAmount) {
      alert(t('conversionCompleted', { leftAmount, leftCurrency, rightAmount, rightCurrency }));
    } else {
      alert(t('conversionEnterAmount'));
    }
  };

  const getCurrencyDisplay = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? `${currency.symbol} ${currency.code}` : code;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setShowLeftDropdown(false);
        setShowRightDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <AuthGate>
      <div className="currency-convert-bg">
        <div className="currency-convert-outer-card">
          <h1 className="currency-convert-title">{t('conversionTitle')}</h1>
          <div className="currency-convert-inner-card">
            {/* Convert to Section */}
            <div className="convert-section">
              <h3 className="section-label">{t('convertToLabel')}</h3>
              <div className="currency-row">
                {/* Left input */}
                <div className="currency-input-group">
                  <input
                    type="number"
                    value={leftAmount}
                    onChange={(e) => handleLeftAmountChange(e.target.value)}
                    placeholder={t('amountPlaceholder')}
                    className="currency-input"
                  />
                  <div className="dropdown-container">
                    <button className="dropdown-button" onClick={() => {
                      setShowLeftDropdown(prev => !prev);
                      setShowRightDropdown(false);
                    }}>
                      {getCurrencyDisplay(leftCurrency)} ▼
                    </button>
                    {showLeftDropdown && (
                      <div className="dropdown-menu">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            className="dropdown-item"
                            onClick={() => handleLeftCurrencyChange(currency.code)}
                          >
                            {getCurrencyDisplay(currency.code)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="arrow-icon">{t('arrow')}</div>
                {/* Right input */}
                <div className="currency-input-group">
                  <input
                    type="number"
                    value={rightAmount}
                    onChange={(e) => handleRightAmountChange(e.target.value)}
                    placeholder={t('amountPlaceholder')}
                    className="currency-input"
                  />
                  <div className="dropdown-container">
                    <button className="dropdown-button" onClick={() => {
                      setShowRightDropdown(prev => !prev);
                      setShowLeftDropdown(false);
                    }}>
                      {getCurrencyDisplay(rightCurrency)} ▼
                    </button>
                    {showRightDropdown && (
                      <div className="dropdown-menu">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            className="dropdown-item"
                            onClick={() => handleRightCurrencyChange(currency.code)}
                          >
                            {getCurrencyDisplay(currency.code)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Convert all to section */}
            <div className="convert-section convert-section-spacing">
              <h3 className="section-label">{t('convertAllToLabel')}</h3>
              <div className="currency-row">
                <div className="dropdown-container">
                  <button 
                    className="dropdown-button"
                    onClick={() => setShowRightDropdown(!showRightDropdown)}
                  >
                    {getCurrencyDisplay(rightCurrency)} ▼
                  </button>
                  {showRightDropdown && (
                    <div className="dropdown-menu">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          className="dropdown-item"
                          onClick={() => handleRightCurrencyChange(currency.code)}
                        >
                          {getCurrencyDisplay(currency.code)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Convert button */}
            <button className="convert-button" onClick={handleConvert}>
              {t('convertButton')}
            </button>
            {rates[leftCurrency]?.[rightCurrency] && (
              <div className="exchange-rate-display">
                <span>
                  {`1 ${leftCurrency} = ${rates[leftCurrency][rightCurrency]} ${rightCurrency}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGate>
  );
}

export default CurrencyConvert;
