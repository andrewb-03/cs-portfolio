/**
 * @file PublicLayout.js
 * @summary Defines the main layout for unauthenticated pages, including a responsive navbar and outlet space.  
 * Provides navigation links to public routes like About, Sign In, and Sign Up.  
 * Handles mobile toggle for the hamburger menu and displays nested routes using React Router's Outlet.
 */

import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Link } from 'react-router-dom';
import './PublicLayout.css';

import { ThemeContext } from '../context/ThemeContext';


export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation('navbar');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'ENG' },
    { code: 'es', label: 'ESP' },
    { code: 'es-MX', label: 'ESP (MX)' },
    { code: 'es-AR', label: 'ESP (AR)' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'hi-Latn', label: 'Hindi (Latin)' }
  ];
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="public-layout-wrapper">
      <nav className="public-navbar">
        <div className="public-navbar-content">
          <div className="navbar-left">
            <Link to="/">
              <img
                src="/images/HomeLogo.png"
                alt="Home Logo"
                className="public-navbar-logo"
              />
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/about">{t('about')}</Link>
            </li>
            <li>
              <Link to="/signin" className="navbar-signin-link">
                {t('signin')}
              </Link>
            </li>
            <li>
              <Link to="/signup" className="navbar-signup-link">
                {t('signup')}
              </Link>
            </li>
            <li style={{ position: 'relative' }}>
              <button
                className="navbar-lang-btn"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-haspopup="true"
                aria-expanded={langMenuOpen}
              >
                {languages.find(l => l.code === i18n.language)?.label || 'ENG'}
                <span className="navbar-lang-arrow">▼</span>
              </button>
              {langMenuOpen && (
                <ul className="navbar-lang-dropdown">
                  {languages.map(lang => (
                    <li key={lang.code}>
                      <button
                        className="navbar-lang-dropdown-item"
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        disabled={i18n.language === lang.code}
                      >
                        {lang.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <button
                className="navbar-theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none' }}
              >
                
                <span className="theme-switch">
                  <span
                    className={`theme-switch-slider${darkMode ? ' theme-switch-slider-on' : ''}`}
                    aria-hidden="true"
                  ></span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="public-layout-container">
        <Outlet />
      </div>
    </div>
  );
}
