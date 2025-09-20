/**
 * @file ForgotPassword.js
 * @summary Provides a form for users to request a password reset link by entering their email address.  
 * Sends a POST request to the backend and displays success or error feedback accordingly.  
 * Features a visual layout with delayed redirect to the reset password page.
 */

import React, { useState } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'If this email is registered, a reset link has been sent.');
        setTimeout(() => {
          window.location.href = '/reset-password';
        }, 5000);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-layout">
      <div className="forgot-side-content">
        <h2 className="forgot-message">Forgot your password?</h2>
        <p className="forgot-desc">Enter your email address and we'll send you a link to reset your password.</p>
        <img src="/images/lemoncute.png" alt="Forgot Password Illustration" className="forgot-illustration" />
      </div>
      <div className="forgot-card">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
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

export default ForgotPassword; 