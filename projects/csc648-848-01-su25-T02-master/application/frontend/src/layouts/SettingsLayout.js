/**
 * @file SettingsLayout.js
 * @summary Wraps all /settings pages in shared layout  
 * Includes a title card at the top and consistent content card below 
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import './SettingsLayout.css';

export default function SettingsLayout() {
  return (
    <div className="settings-layout-wrapper">
      <div className="settings-layout-column">
        <div className="settings-title-card">
          <h2 className="text-2xl font-bold text-[#1C8536] text-center">Settings</h2>
        </div>

        <div className="settings-content-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
