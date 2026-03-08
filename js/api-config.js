/**
 * Portfolio API base URL configuration.
 * Environment-aware: works for desktop localhost, mobile on same network, and production.
 *
 * Resolution order:
 * 1. window.PORTFOLIO_API_URL (explicit override, e.g. from inline script)
 * 2. localhost/127.0.0.1 → http://localhost:8000 (always use local backend for dev)
 * 3. <meta name="portfolio-api-url" content="..."> (for production deployment)
 * 4. Private IP → http://{hostname}:8000 (mobile on same network)
 * 5. Else → same-origin ''
 */
(function () {
  if (typeof window.PORTFOLIO_API_URL === 'string' && window.PORTFOLIO_API_URL.trim()) {
    return; // Already set
  }
  var host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    window.PORTFOLIO_API_URL = 'http://localhost:8000';
    return;
  }
  var meta = document.querySelector('meta[name="portfolio-api-url"]');
  if (meta && meta.content && meta.content.trim()) {
    window.PORTFOLIO_API_URL = meta.content.trim().replace(/\/$/, '');
    return;
  }
  if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(host)) {
    window.PORTFOLIO_API_URL = 'http://' + host + ':8000';
    return;
  }
  window.PORTFOLIO_API_URL = ''; // Same-origin fallback
})();
