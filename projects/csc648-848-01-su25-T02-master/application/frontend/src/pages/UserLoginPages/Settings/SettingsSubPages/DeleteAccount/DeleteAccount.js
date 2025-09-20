// ==============================================
// DELETE ACCOUNT PAGE
// ==============================================

/**
 * @file DeleteAccount.js
 * @summary Provides a secure UI for users to permanently delete their account with confirmation and password entry.  
 * Loads current user info from session, validates input, and sends a delete request to the backend.  
 * Prevents accidental deletion with typed phrase, alerts, and visual feedback.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DeleteAccount() {
  const [userInfo, setUserInfo] = useState(null);
  const [confirmation, setConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load logged-in user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/me`, {
          credentials: 'include'
        });

        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
          setEmail(data.email); // Optional: pre-fill for visual feedback
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleDelete = async () => {
    if (confirmation !== 'DELETE ACCOUNT' || password.trim() === '') {
      alert('You must type DELETE ACCOUNT and enter your password to proceed.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to permanently delete your account?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/delete-account`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Your account has been deleted.');
        window.location.href = '/';
      } else {
        alert(data.message || 'Failed to delete account.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Link to="/settings" className="text-sm text-gray-700 hover:underline mb-4 inline-block">
        ← Back to Settings
      </Link>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[darkred]">
        <img src="/settings-icons/delete.svg" alt="Delete" className="w-6 h-6" />
        Delete Account
      </h2>

      {userInfo ? (
        <>
          <p className="mb-4 text-sm text-gray-600">
            You are logged in as <strong>{userInfo.name}</strong> ({userInfo.email})
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label className="w-36 font-medium text-sm">Email</label>
              <input
                type="email"
                className="flex-1 border rounded px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 font-medium text-sm">Password</label>
              <input
                type="password"
                className="flex-1 border rounded px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 font-medium text-sm">Type DELETE ACCOUNT</label>
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2 text-sm"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </div>
          </div>

          <button
            className={`bg-red-600 text-white rounded py-2 px-4 mt-4 hover:bg-red-700 self-end ${
              confirmation !== 'DELETE ACCOUNT' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDelete}
            disabled={confirmation !== 'DELETE ACCOUNT'}
          >
            Delete My Account
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-500">Loading your info...</p>
      )}
    </>
  );
}
