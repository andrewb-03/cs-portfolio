/**
 * @file Reviews.js
 * @summary Allows users to submit reviews about the website experience.
 * Provides a form for rating and feedback with a clean, consistent UI.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthGate from '../../../../../components/AuthGate';
import './Reviews.css';
import { useTranslation } from 'react-i18next';

function Reviews() {
  const { t } = useTranslation('settings'); // ✅ Correct: inside component
  void t;
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('5');
  const [feedbackType, setFeedbackType] = useState('user_experiance');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/me`, {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const review = {
      message: message.trim(),
      rating,
      type: feedbackType
    };

    console.log('Submitting review:', review);
    console.log('User info:', userInfo);

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(review)
      });

      if (res.ok) {
        setSubmitted(true);
        setMessage('');
        setRating('5');
      } else {
        const errorData = await res.json();
        alert(`Failed to submit review: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network error submitting review:', error);
      alert(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNewReview = () => {
    setSubmitted(false);
    setMessage('');
    setRating('5');
    setFeedbackType('user_experiance');
  };

  return (
    <AuthGate>
      <>
        <Link to="/settings" className="text-sm text-gray-700 hover:underline mb-4 inline-block">
          ← Back to Settings
        </Link>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1C8536]">
          <img src="/settings-icons/Edit.svg" alt="Feedback" className="w-6 h-6" />
          Feedback & Reviews
        </h2>
        <p className="text-gray-600 mb-6">Help us improve Limoney by sharing your experience</p>

          {submitted ? (
            <div className="success-section">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Thank you for your feedback!</h2>
              <p className="success-message">
                Your input helps us make Limoney better for everyone. We appreciate you taking the time to share your thoughts.
              </p>
              <button onClick={handleNewReview} className="new-review-btn">
                Submit More Feedback
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label className="form-label">Rating</label>
                <div className="rating-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${parseInt(rating) >= star ? 'active' : ''}`}
                      onClick={() => setRating(star.toString())}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="rating-text">{rating} out of 5 stars</span>
              </div>

              <div className="form-group">
                <label className="form-label">Your Review</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or report any issues you've encountered..."
                  className="review-textarea"
                  rows="6"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || !message.trim()} 
                className="submit-btn"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </>
      </AuthGate>
    );
}
export default Reviews;

