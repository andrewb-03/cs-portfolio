/**
 * @file EditReminderModal.js
 * @summary Displays a modal interface for editing existing user reminders with validation and timezone handling.  
 * Converts local Pacific Time input to UTC for backend consistency and submits changes via API.  
 * Handles live field updates, error messaging, and triggers save/close callbacks on success.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export default function EditReminderModal({ reminder, onClose, onSave }) {
  const [label, setLabel] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [error, setError] = useState('');

  useEffect(() => {
    setLabel(reminder.label || '');
    setDate(reminder.date); // Already in YYYY-MM-DD
    setTime(reminder.time); // Already in HH:MM 24hr
    setRecurrence(reminder.recurrence || 'none');
  }, [reminder]);

  const handleSave = async () => {
    if (!label || !date || !time) {
      setError('All fields are required.');
      return;
    }

    // Convert local PT time to UTC for backend storage
    const ptDate = new Date(
      new Date(`${date}T${time}`).toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
      })
    );
    const utcISOString = ptDate.toISOString();

    if (ptDate < new Date()) {
      setError('Reminder must be set in the future.');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/notifications/${reminder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: label,
          date: utcISOString,
          recurrence,
        }),
      });

      if (res.ok) {
        onSave();
        onClose();
      } else {
        const msg = await res.json();
        setError(msg.message || 'Update failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: 'white', padding: '2rem', borderRadius: '10px', minWidth: '300px',
        width: '90%', maxWidth: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
      }}>
        <h2 className="text-lg font-bold mb-4">Edit Reminder</h2>

        <label className="block mb-2 text-sm font-medium">Label</label>
        <input
          className="border rounded px-3 py-2 w-full mb-3"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Date</label>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full mb-3"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Time</label>
        <input
          type="time"
          className="border rounded px-3 py-2 w-full mb-3"
          value={time}
          onChange={e => setTime(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Recurrence</label>
        <select
          className="border rounded px-3 py-2 w-full mb-4"
          value={recurrence}
          onChange={e => setRecurrence(e.target.value)}
        >
          <option value="none">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

EditReminderModal.propTypes = {
  reminder: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    recurrence: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};