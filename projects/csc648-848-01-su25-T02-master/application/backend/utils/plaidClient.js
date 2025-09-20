/**
 * @file plaidClient.js
 * @summary Initializes and exports a configured Plaid API client using credentials from environment variables.  
 * Selects the environment (sandbox, development, production) dynamically based on runtime config.  
 * Used by routes to make authenticated requests to the Plaid service.
 */

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(config);

// Helper function to get webhook URL based on environment
const getWebhookUrl = () => {
  const env = process.env.PLAID_ENV || 'sandbox';
  const backendUrl = process.env.URL_BACKEND_PORT || 'https://localhost:5000';
  
  return `${backendUrl}/api/plaid/webhook`;
};

module.exports = { plaidClient, getWebhookUrl };
