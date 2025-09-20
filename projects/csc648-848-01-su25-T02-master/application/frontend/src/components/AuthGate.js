/**
 * @file AuthGate.js
 * @summary Protects private routes by verifying user authentication status through a backend API call.  
 * Redirects unauthenticated users to the signin page while displaying a loading state.  
 * Wraps and conditionally renders children only when session validation is successful.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthGate({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/settings`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(() => setLoading(false))
      .catch(() => navigate('/signin'));
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return children;
}

AuthGate.propTypes = {
  children: PropTypes.node.isRequired,
};