import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext'; // <-- Correct path

export default function DarkModeSettings() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className="settings-bg">
      <div className="settings-card">
        <div className="settings-header">
          {/* Use the icon placeholder for uniformity */}
          <span className="settings-user-icon">
            <span className="theme-switch">
              <span
                className={`theme-switch-slider${darkMode ? ' theme-switch-slider-on' : ''}`}
                aria-hidden="true"
                onClick={() => setDarkMode(!darkMode)}
                style={{ cursor: 'pointer' }}
              ></span>
            </span>
          </span>
          <span className="settings-title">Dark Mode</span>
        </div>
        <div className="settings-section">
          <label className="settings-label">Toggle dark mode:</label>
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
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </div>
  );
}