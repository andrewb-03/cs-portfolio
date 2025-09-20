import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Language.css';

export default function LanguageSettings() {
  const { i18n, t } = useTranslation('settings');
  const [menuOpen, setMenuOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'es-MX', label: 'Español (México)' },
    { code: 'es-AR', label: 'Español (Argentina)' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'hi-Latn', label: 'Hindi (Latin)' }
  ];

  const handleLanguageChange = async (code) => {
    i18n.changeLanguage(code);
    setMenuOpen(false);
    await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/language`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: code }),
    });
  };

  return (
    <div className="settings-bg">
      <div className="settings-card">
        <div className="settings-header">
          <img src="/navbar-icons/language.png" alt="Language" className="settings-user-icon" />
          <span className="settings-title">{t('languageTitle')}</span>
        </div>
        <div className="settings-section">
          <label className="settings-label">{t('languageSelect')}</label>
          <div className="settings-lang-dropdown">
            <button
              className="settings-lang-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              {languages.find(l => l.code === i18n.language)?.label || 'English'}
              <span className="settings-lang-arrow">▼</span>
            </button>
            {menuOpen && (
              <ul className="settings-lang-list">
                {languages.map(lang => (
                  <li key={lang.code}>
                    <button
                      className="settings-lang-item"
                      onClick={() => handleLanguageChange(lang.code)}
                      disabled={i18n.language === lang.code}
                    >
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}