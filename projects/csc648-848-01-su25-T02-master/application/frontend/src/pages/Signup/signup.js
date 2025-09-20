/**
 * @file Signup.js
 * @summary Renders a registration form with validation for name, email, and password, plus feedback messages.  
 * Submits user data to the backend and handles both success and error states with visual cues.  
 * Styled with a two-column layout: left for visuals and right for form interaction.
 */

import './signup.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Signup component for user registration


// This component allows users to sign up by providing their name, email, and password.
function Signup() {
    const { t } = useTranslation('signup');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'error' or 'success'
    const [showTerms, setShowTerms] = useState(false);
    const [agreeTOS, setAgreeTOS] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            setMessage(t('allFieldsRequired'));
            setMessageType('error');
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setMessage(t('invalidEmail'));
            setMessageType('error');
            setLoading(false);
            return;
        }

        if (trimmedPassword.length < 6) {
            setMessage(t('passwordShort'));
            setMessageType('error');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    password: trimmedPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || t('error'));
                setMessageType('error');
            } else {
                setMessage(data.message || t('success'));
                setMessageType('success');
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setMessage(error.message || t('error'));
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    }

    return (
         <div className="signup-layout">
            {/* LEFT: Illustration + message */}
            <div className="signup-side-content">
                <p className="signup-message">{t('sideMessage')}</p>
                <ul className="signup-bullets">
                    <li>{t('bullet1')}</li>
                    <li>{t('bullet2')}</li>
                    <li>{t('bullet3')}</li>
                </ul>
                <img src="/images/UserIcon.png" alt="Signup illustration" className="signup-illustration" draggable="false"/>
                {showTerms && (
                <div className="tos-overlay" onClick={() => setShowTerms(false)}>
                    <div className="tos-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{t('viewTos')}</h3>
                        <div className="tos-text">
                            {/* Terms content here */}
                            <p>WORK IN PROGRESS</p>
                        </div>
                    </div>
                </div>
                )}
            </div>

            {/* RIGHT: Yellow signup form */}
            <div className="signup-card">
                <h1>{t('title')}</h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <label>{t('name')}</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <p className="required-text">{t('required')}</p>
                </div>
                <div>
                    <label>{t('email')}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className="required-text">{t('required')}</p>
                </div>
                <div>
                    <label>{t('password')}</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="required-text">{t('required')}</p>
                </div>
                <button type="button" className="tos-button" onClick={() => setShowTerms(true)}>
                    {t('viewTos')}
                </button>
                <label className="tos-check">
                    <div className="tos-check-text">
                        <input
                            type="checkbox"
                            checked={agreeTOS}
                            onChange={(e) => setAgreeTOS(e.target.checked)}
                        />
                        <p className="required-text">{t('required')}</p>
                    </div>
                    {t('tos')}
                </label>

                <button type="submit" disabled={loading || !agreeTOS} className="signup-button">
                    {loading ? t('registering') : t('submit')}
                </button>
                </form>
                {message && (
                  <div
                    className={messageType === 'error' ? 'error-message' : 'success-message'}
                  >
                    {message}
                  </div>
                )}
            </div> 
        </div>  
    );
}
export default Signup;
