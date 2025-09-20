/**
 * @file NotificationsReminders.js
 * @summary Lets users create, view, edit, and delete scheduled reminder notifications via form and modal.  
 * Converts local input times to UTC, stores them using the backend, and reloads on changes.  
 * Displays all reminders with recurrence options and integrates EditReminderModal for updates.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditReminderModal from '../../../../../components/EditReminderModal';
import { useTranslation } from 'react-i18next';

export default function NotificationsReminders() {
  const { t } = useTranslation('settings'); // ✅ Correct: inside component

  const [reminders, setReminders] = useState([]);
  const [label, setLabel] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [editingReminder, setEditingReminder] = useState(null);

  const fetchReminders = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/notifications`, {
        credentials: 'include',
      });
      const data = await res.json();

      const parsed = data
        .filter(r => r.type === 'reminder')
        .map(n => {
          const utc = new Date(n.date);
          const d = utc.toLocaleDateString('en-US', {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
          const t = utc.toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });

          return {
            id: n.notificationId,
            label: n.content,
            date: d,
            time: t,
            recurrence: n.recurrence || 'none',
          };
        });

      setReminders(parsed);
    } catch (err) {
      console.error('Failed to load reminders:', err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const addReminder = async (e) => {
    e.preventDefault();
    if (!label || !date || !time) return;

    const scheduled = new Date(`${date}T${time}`);
    const now = new Date();

    if (scheduled < now) {
      alert('Reminder must be set in the future.');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          type: 'reminder',
          content: label,
          date: scheduled.toISOString(), // convert to UTC before sending
          recurrence,
        }),
      });

      if (res.ok) {
        setLabel('');
        setDate('');
        setTime('');
        setRecurrence('none');
        fetchReminders();
        window.dispatchEvent(new Event('remindersUpdated'));
      }
    } catch (err) {
      console.error('Error adding reminder:', err);
    }
  };

  const deleteReminder = async (idx) => {
    const reminder = reminders[idx];
    try {
      await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/notifications/${reminder.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setReminders(reminders.filter((_, i) => i !== idx));
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  return (
    <>
      <Link to="/settings" className="text-sm text-gray-700 hover:underline mb-4 inline-block">
        ← Back to Settings
      </Link>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1C8536]">
        <img src="/settings-icons/Bell.svg" alt="Notifications" className="w-6 h-6" />
        Notifications & Reminders
      </h2>

      <form className="flex flex-col gap-2" onSubmit={addReminder}>
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Reminder label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option value="none">No Repeat</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button className="bg-[#1C8536] text-white rounded py-2 px-4 mt-2 hover:bg-lime-500" type="submit">
          Add
        </button>
      </form>

      <div className="mt-4">
        <span className="font-semibold text-gray-800">Your Reminders</span>
        {reminders.length === 0 && <div className="text-gray-500 mt-2">No reminders yet.</div>}
        {reminders.map((rem, idx) => (
          <div
            key={rem.id}
            className="bg-gray-100 rounded mt-2 px-4 py-2 flex items-center justify-between text-sm"
          >
            <div>
              <strong>{rem.label}</strong>
              <div className="text-gray-600 text-xs">
                {rem.date} {rem.time} PT
                {rem.recurrence !== 'none' && <span> • {rem.recurrence}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <img
                src="/settings-icons/Edit.svg"
                alt="Edit"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setEditingReminder(rem)}
              />
              <img
                src="/settings-icons/delete.svg"
                alt="Delete"
                className="w-5 h-5 cursor-pointer"
                onClick={() => deleteReminder(idx)}
              />
            </div>
          </div>
        ))}
      </div>

      {editingReminder && (
        <EditReminderModal
          reminder={editingReminder}
          onClose={() => setEditingReminder(null)}
          onSave={() => {
            fetchReminders();
            window.dispatchEvent(new Event('remindersUpdated'));
          }}
        />
      )}
    </>
  );
}

