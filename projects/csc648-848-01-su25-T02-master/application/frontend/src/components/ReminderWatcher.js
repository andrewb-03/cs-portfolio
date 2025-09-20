/**
 * @file ReminderWatcher.js
 * @summary Monitors scheduled reminders and displays real-time popup alerts when one is due.  
 * Syncs with the backend to fetch upcoming notifications and listens for manual update events.  
 * Runs an interval to check each minute and manages dismiss state to avoid duplicate alerts.
 */

import React, { useEffect, useRef, useState } from 'react';

export default function ReminderWatcher() {
  const [popup, setPopup] = useState(null);
  const [dismissedIds, setDismissedIds] = useState([]);
  const remindersRef = useRef([]); // No more warning

  const loadReminders = () => {
    fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/notifications`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const parsed = data
          .filter(n => n.type === 'reminder')
          .map(n => {
            const [d, t] = new Date(n.date).toISOString().split('T');
            return {
              id: n.notificationId,
              label: n.content,
              date: d,
              time: t.slice(0, 5),
              triggered: false
            };
          });
        remindersRef.current = parsed;
      })
      .catch(err => console.error('ReminderWatcher fetch error:', err));
  };

  useEffect(() => {
    loadReminders();
    window.addEventListener('remindersUpdated', loadReminders);
    return () => window.removeEventListener('remindersUpdated', loadReminders);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16);

      remindersRef.current = remindersRef.current.map(rem => {
        const remTime = `${rem.date}T${rem.time}`;
        if (!rem.triggered && !dismissedIds.includes(rem.id) && remTime === now) {
          setPopup({ id: rem.id, label: rem.label });
          return { ...rem, triggered: true };
        }
        return rem;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [dismissedIds]);

  const dismissPopup = () => {
    if (popup) {
      setDismissedIds(prev => [...prev, popup.id]);
      setPopup(null);
    }
  };

  if (!popup) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#1C8536',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      zIndex: 9999,
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      🔔 Reminder: {popup.label}
      <button
        onClick={dismissPopup}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1.2rem',
          cursor: 'pointer'
        }}
      >
        ✖
      </button>
    </div>
  );
}
