/**
 * @file Signin.js
 * @summary Displays a login form with email and password fields, styled with a two-panel layout.  
 * Sends user credentials to the backend, handles success and error messaging, and redirects on login.  
 * Includes a forgot password link and dynamic feedback for authentication state.
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './signin.css';


function Signin() {
  const { t } = useTranslation('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(t('success'));
        setIsSuccess(true);
        setTimeout(() => {
          // Check user type and redirect accordingly
          if (data.user && data.user.userType === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1000); //delay
      } else {
        setMessage(data.message || t('error'));
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage(t('error'));
      setIsSuccess(false);
    }
  };

  return (
  <div className="signin-layout">
    <div className="signin-side-content">
      <img
        src="/images/lemonTree.png"
        alt="Login visual"
        className="signin-illustration"
        draggable="false"
      />
      <p className="signin-message">{t('sideMessage')}</p>
    </div>

    <div className="signin-card">
      <h1>{t('title')}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('email')}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="password-block">
          <label>{t('password')}</label>
          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password-link">
            <Link to="/forgot-password">{t('forgot')}</Link>
          </div>
        </div>
        <button type="submit" disabled={isSuccess === true}>
          {isSuccess === true ? t('redirecting') : t('submit')}
        </button>
      </form>

      {message && (
        <div className={isSuccess ? 'success-msg' : 'error-msg'}>
          {message}
        </div>
      )}
    </div>
  </div>
  );
}

export default Signin;
