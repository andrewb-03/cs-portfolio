/* ============================================= */
/* PRIVACY MODE BUTTON */
/* ============================================= */

import React, { useState } from 'react';

export default function PrivacyModeButton() {
  const [privacyMode, setPrivacyMode] = useState(() => {
    const saved = localStorage.getItem('privacyMode');
    return saved === 'true';
  });

  const togglePrivacyMode = () => {
    const newVal = !privacyMode;
    setPrivacyMode(newVal);
    localStorage.setItem('privacyMode', newVal);
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  return (
    <button
      className={`settings-privacy-btn flex items-center gap-4 p-4 border border-gray-200 rounded hover:bg-gray-50 transition w-full text-left text-base font-medium text-gray-800 cursor-pointer${privacyMode ? ' bg-green-50' : ''}`}
      onClick={togglePrivacyMode}
      style={{
        background: privacyMode ? '#F0FDF4' : 'white'
      }}
    >
      <img
        src={privacyMode ? '/settings-icons/closedEye.svg' : '/settings-icons/openEye.svg'}
        alt={privacyMode ? 'Privacy Mode On' : 'Privacy Mode Off'}
        className="w-6 h-6"
      />
      <span>
        Privacy Mode {privacyMode ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}