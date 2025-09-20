/**
 * @file reportWebVitals.js
 * @summary Captures frontend performance metrics using the Web Vitals API and passes them to a callback.  
 * Dynamically imports measurement tools like CLS, FID, LCP, and TTFB only if a valid handler is provided.  
 * Used for monitoring real user performance and improving frontend responsiveness.
 */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
