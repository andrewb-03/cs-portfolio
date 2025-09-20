/**
 * @file UserLayout.js
 * @summary Defines the main layout and navigation sidebar for authenticated users across the app.  
 * Provides links to key user pages and handles logout by clearing the session via backend call.  
 * Renders nested content using React Router's Outlet inside a structured application shell.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './UserLayout.css';

export default function UserLayout() {
  const navigate = useNavigate();
  const [showWrenchDropdown, setShowWrenchDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const wrenchRef = useRef(null);
  const privacyMode = localStorage.getItem('privacyMode') === 'true';

  // Fetch user information on component mount
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
      }
    };

    fetchUserInfo();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrenchRef.current && !wrenchRef.current.contains(event.target)) {
        setShowWrenchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAdmin = userInfo && userInfo.userType === 'admin';

  return (
    <>
      <nav className="user-navbar">
        <ul>
          {/* Admin Panel Link - Only visible to admin users */}
          {isAdmin ? (
            <li>
              <Link to="/admin" className="nav-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="nav-icon">
                  {/* Simple user icon */}
                  <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <span className="nav-label">Admin</span>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">
                  <img src="/navbar-icons/Vector.svg" alt="Dashboard" className="nav-icon dashboard-icon" />
                  <span className="nav-label">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/accounts" className="nav-link">
                  <img src="/navbar-icons/Home.svg" alt="Accounts" className="nav-icon" />
                  <span className="nav-label">Accounts</span>
                </Link>
              </li>
              <li>
                <Link to="/budget" className="nav-link">
                  <img src="/navbar-icons/File.svg" alt="Budget" className="nav-icon" />
                  <span className="nav-label">Budget</span>
                </Link>
              </li>
              {!privacyMode && (
                <li>
                  <Link to="/lemonaid" className="nav-link">
                    <img src="/navbar-icons/Message-circle.svg" alt="LemonAid" className="nav-icon" />
                    <span className="nav-label">LemonAid</span>
                  </Link>
                </li>
              )}
              <li>
                <div className="nav-link wrench-tools-container" ref={wrenchRef}>
                  <button 
                    className="wrench-tools-button"
                    onClick={() => setShowWrenchDropdown(!showWrenchDropdown)}
                  >
                    <img src="/navbar-icons/wrench.svg" alt="Tools" className="nav-icon" />
                    <span className="nav-label">Tools</span>
                  </button>
                  {showWrenchDropdown && (
                    <div className="wrench-dropdown">
                      <button 
                        className="wrench-dropdown-item"
                        onClick={() => {
                          navigate('/reimbursement-request');
                          setShowWrenchDropdown(false);
                        }}
                      >
                        <img src="/navbar-icons/reimbursement.svg" alt="Reimbursement" className="dropdown-icon" />
                        Reimbursement Request
                      </button>
                      <button 
                        className="wrench-dropdown-item"
                        onClick={() => {
                          navigate('/currency-convert');
                          setShowWrenchDropdown(false);
                        }}
                      >
                        <img src="/navbar-icons/currencyConverter.png" alt="Currency Converter" className="dropdown-icon" />
                        Currency Converter
                      </button>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <Link to="/settings" className="nav-link">
                  <img src="/navbar-icons/Settings.svg" alt="Settings" className="nav-icon" />
                  <span className="nav-label">Settings</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="App-content">
        <Outlet />
      </div>
    </>
  );
}
