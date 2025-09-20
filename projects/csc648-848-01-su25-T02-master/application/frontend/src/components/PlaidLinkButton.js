/**
 * @file PlaidLinkButton.jsx
 * @summary Connects the user’s bank account using Plaid Link and triggers transaction import on success.  
 * Retrieves a link token from the backend, opens Plaid’s flow, and exchanges public tokens securely.  
 * Notifies the user on completion and optionally triggers a callback to refresh account data.
 */

// components/PlaidLinkButton.jsx
import { usePlaidLink } from 'react-plaid-link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


export default function PlaidLinkButton({ onSuccessImport }) {
  const [linkToken, setLinkToken] = useState(null);

  // Step 1: Get Link Token
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/plaid/create_link_token`, {}, { withCredentials: true });
        console.log('Got link token:', res.data.link_token);
        setLinkToken(res.data.link_token);
        console.log('Link token:', res.data.link_token);
      } catch (err) {
        console.error('Failed to get link token:', err);
      }
    };

    fetchLinkToken();
  }, []);

  // Step 2: Setup Plaid Link
  const config = {
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      try {
        // Step 3: Exchange token
        await axios.post(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/plaid/exchange_public_token`, { public_token }, { withCredentials: true });

        // Step 4: Import transactions
        const importRes = await axios.post(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/plaid/import`, {}, { withCredentials: true });
        alert(importRes.data.message);
        //  Step 5: Import subscriptions
    const recurringRes = await axios.post(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/plaid/recurring`, {}, { withCredentials: true });
    console.log('Subscriptions imported:', recurringRes.data.message);
        if (onSuccessImport) onSuccessImport();
      } catch (err) {
        console.error('Plaid link error:', err);
        alert('Something went wrong linking your account.');
      }
    },
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-yellow-400 px-4 py-2 rounded text-black font-semibold"
    >
      Link Bank Account
    </button>
  );
}

PlaidLinkButton.propTypes = {
  onSuccessImport: PropTypes.func.isRequired,
};