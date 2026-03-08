/**
 * Portfolio API base URL configuration.
 * Environment-aware: works for desktop localhost, mobile on same network, and production.
 *
 * Resolution order:
 * 1. window.PORTFOLIO_API_URL (explicit override, e.g. from inline script)
 * 2. <meta name="portfolio-api-url" content="..."> (for production deployment)
 * 3. Smart defaults:
 *    - localhost/127.0.0.1 → http://localhost:8000
 *    - Private IP (192.168.x, 10.x, 172.16-31.x) → http://{hostname}:8000 (mobile on same network)
 *    - Production hostname → relative '' (same-origin; set meta tag if API is elsewhere)
 */
(function () {
  if (typeof window.PORTFOLIO_API_URL === 'string' && window.PORTFOLIO_API_URL.trim()) {
    return; // Already set
  }
  var meta = document.querySelector('meta[name="portfolio-api-url"]');
  if (meta && meta.content && meta.content.trim()) {
    window.PORTFOLIO_API_URL = meta.content.trim().replace(/\/$/, '');
    return;
  }
  var host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    window.PORTFOLIO_API_URL = 'http://localhost:8000';
    return;
  }
  if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(host)) {
    window.PORTFOLIO_API_URL = 'http://' + host + ':8000';
    return;
  }
  window.PORTFOLIO_API_URL = ''; // Same-origin for production (or set meta tag)
})();
