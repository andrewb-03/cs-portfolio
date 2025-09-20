/**
 * @file Settings.js
 * @summary Index route for /settings  
 * Renders the clickable list of settings options like personal info, reminders, and delete account
 */

import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthGate from '../../../components/AuthGate';
import { ThemeContext } from '../../../context/ThemeContext';
import PrivacyModeButton from './SettingsSubPages/PrivacyMode/PrivacyMode';

// Translation keys for settings options
const getSettingsOptions = (t) => [
  { label: t('personalInfo', 'Personal Info'), icon: '/settings-icons/person.svg', to: 'personal-info' },
  { label: t('support', 'Support'), icon: '/settings-icons/support.png', to: 'support' },
  { label: t('reviews', 'Feedback & Reviews'), icon: '/settings-icons/Edit.svg', to: 'reviews' },
  { label: t('notifications', 'Notifications & Reminders'), icon: '/settings-icons/Bell.svg', to: 'notifications-reminders' },
  { label: t('language', 'Language'), icon: '/navbar-icons/language.png', to: 'language' },
  { label: t('deleteAccount', 'Delete Account'), icon: '/settings-icons/delete.svg', to: 'delete-account' },
  { label: t('signOut', 'Sign Out'), icon: '/settings-icons/logout-icon.svg', to: 'signout' }
];

const getAdminSettingsOptions = (t) => [
  { label: t('personalInfo', 'Personal Info'), icon: '/settings-icons/person.svg', to: 'personal-info' },
  { label: t('signOut', 'Sign Out'), icon: '/settings-icons/logout-icon.svg', to: 'signout' }
];

export default function Settings() {
  const { t } = useTranslation('settings');
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/me`, {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const isAdmin = userInfo && userInfo.userType === 'admin';
  const optionsToShow = isAdmin ? getAdminSettingsOptions(t) : getSettingsOptions(t);

  if (loading) {
    return (
      <AuthGate>
        <div className="settings-bg">
          <div className="settings-card">
            <div className="flex flex-col gap-3">
              <div className="text-center">{t('loading', 'Loading...')}</div>
            </div>
          </div>
        </div>
      </AuthGate>
    );
  }

  return (
    <AuthGate>
      <div className="settings-bg">
        <div className="settings-card">
          {/* Dark mode switch in icon/title area */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-[#1C8536]">Settings</span>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '8px'
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '18px',
                  display: 'inline-block',
                  background: darkMode ? '#222' : '#ccc',
                  borderRadius: '9px',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: darkMode ? '16px' : '2px',
                    top: '2px',
                    width: '14px',
                    height: '14px',
                    background: darkMode ? '#86F022' : '#fff',
                    borderRadius: '50%',
                    transition: 'left 0.2s, background 0.2s'
                  }}
                ></span>
              </span>
              <span style={{ fontSize: '1rem', color: '#222' }}>
                {darkMode ? 'Dark' : 'Light'}
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {/* Only show PrivacyModeButton for non-admin users */}
            {!isAdmin && <PrivacyModeButton />}
            {optionsToShow.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded hover:bg-gray-50 transition"
              >
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                <span className="text-base font-medium text-gray-800">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthGate>
  );
}