/**
 * @file ResetPassword.js
 * @summary Provides a secure form to reset a user's password by verifying email and matching new inputs.  
 * Validates input fields, sends update requests to the backend, and redirects after successful reset.  
 * Displays real-time error/success messages and features a stylized two-column layout.
 */

import React, { useState } from 'react';
import './ResetPassword.css';
import { Link } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Password updated successfully!');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }// Redirect to signin page after 3 seconds
      setTimeout(() => {
        window.location.href = '/signin';
      }, 3000);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-layout">
      <div className="reset-side-content">
        <h2 className="reset-message">Reset your password</h2>
        <p className="reset-desc">Enter your email and choose a new password to reset your account.</p>
        <img src="/images/lemoncute.png" alt="Reset Password Illustration" className="reset-illustration" />
      </div>
      <div className="reset-card">
        <h1>Set New Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
        </form>
        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}
        <div className="back-to-signin">
          <Link to="/signin">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword; 