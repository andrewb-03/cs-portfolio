
/**
 * @file LemonAid.js
 * @summary Renders an AI-powered chatbot interface for financial questions, with message history and live feedback.  
 * Sends prompts to the backend Gemini-powered endpoint and dynamically updates the chat window.  
 * Includes optional review form popup and auto-scroll behavior for new messages.
 */
 
import React, { useState, useRef, useEffect } from 'react';
import './LemonAid.css';
import '../../../layouts/UserLayout.css';
import ReviewForm from '../../../components/ReviewForm';
import AuthGate from '../../../components/AuthGate';

export default function LemonAid() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'LemonAid', text: "Hi! I'm LemonAid. Ask me anything about your finances!" },
  ]);
  const [input, setInput] = useState('');
  const [transactions, setTransactions] = useState([]);
  const now = new Date();
  const [selectedMonth] = useState(now.getMonth());
  const [selectedYear] = useState(now.getFullYear());
  const chatRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setTransactions(Array.isArray(data) ? data : []))
      .catch(err => console.error('Failed to fetch transactions:', err));
  }, [selectedMonth, selectedYear]);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages(prev => [...prev, { sender: 'You', text: input }]);

    (async () => {
      const reply = await generateReply(input);
      setMessages(prev => [...prev, { sender: 'LemonAid', text: reply }]);
    })();

    setInput('');
  };

  const generateReply = async (msg) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/lemonaid-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: msg,
          transactions,
          year: selectedYear,
          month: selectedMonth,
        }),
      });

      const data = await res.json();
      return data.reply || "Sorry, I couldn't think of anything!";
    } catch (err) {
      console.error('❌ Error fetching reply:', err);
      return "Oops!! Something went wrong.";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <AuthGate>
      <div className="lemonaid-bg">
        <div className="lemonaid-chat-container">
          <h1 className="lemonaid-title">Chat with LemonAid</h1>

          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <button onClick={() => setShowReviewForm(prev => !prev)}>
              {showReviewForm ? 'Close Feedback' : 'Leave Feedback'}
            </button>
          </div>

          {showReviewForm && (
            <div style={{ position: 'absolute', top: 50, right: 10, background: 'white', padding: 10 }}>
              <ReviewForm
                userId={null}
                logId={null}
                type="chatbot"
                onSuccess={() => {
                  alert('Thanks for your feedback!');
                  setShowReviewForm(false);
                }}
                onClose={() => setShowReviewForm(false)}
              />
            </div>
          )}

          <div ref={chatRef} className="lemonaid-chat-area">
            {messages.map((msg, idx) => (
              msg.sender === 'LemonAid' ? (
                <div key={idx} style={{ display: 'flex' }}>
                  <div className="lemonaid-bubble">
                    <strong>LemonAid:</strong><br />{msg.text}
                  </div>
                </div>
              ) : (
                <div key={idx} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div className="user-bubble">
                    <strong>You:</strong><br />{msg.text}
                  </div>
                </div>
              )
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="lemonaid-prompt-area">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              cols={80}
              placeholder="Prompt here..."
              style={{ resize: 'none' }}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button type="submit" className="lemonaid-send-btn" aria-label="Send">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#222" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </AuthGate>
  );
}
