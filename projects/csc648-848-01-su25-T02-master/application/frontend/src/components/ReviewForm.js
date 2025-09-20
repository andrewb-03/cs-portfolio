/**
 * @file ReviewForm.js
 * @summary Renders a controlled form for submitting user reviews with a message and rating.  
 * Sends POST requests to the backend and handles loading, validation, and result callbacks.  
 * Allows optional closing and success behavior via parent-provided handlers.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import AuthGate from '../../../components/AuthGate';

function ReviewForm({ userId, logId, type, onSuccess, onClose }) {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('5');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const review = {
      userId,
      logId,
      message,
      rating,
      type
    };
    const url = `${process.env.REACT_APP_URL_BACKEND_PORT}/api/reviews`;
    console.log('📡 Submitting review to:', url);

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });

      const text = await res.text(); // useful for debugging

      if (!res.ok) {
        console.error(`Server error ${res.status}: ${text}`);
        alert(`Failed to submit review: ${text}`);
        return;
      }

      console.log('Review submitted:', text);

      if (onSuccess) onSuccess();
      setMessage('');
      setRating('5');
      if (onClose) onClose();
    } catch (error) {
      console.error('Network error submitting review:', error);
      alert(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Your feedback..."
        />
        <br />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
        {onClose && (
          <button onClick={onClose} type="button">
            Cancel
          </button>
        )}
      </form>
  );
}

export default ReviewForm;

ReviewForm.propTypes = {
  userId: PropTypes.string,
  logId: PropTypes.string,
  type: PropTypes.string,
  onSuccess: PropTypes.func,
  onClose: PropTypes.func,
};