 
/**
 * @file PersonalInfo.js
 * @summary Displays and allows inline editing of a user's name and email from session-authenticated data.  
 * Loads user info from the `/api/me` endpoint and provides simple client-side update simulation.  
 * Includes visual feedback for loading, editing, and save success states.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PersonalInfo() {
  const { t } = useTranslation('settings');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/personalinfo_edit`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setEditName(data.name);
        setEditEmail(data.email);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user info:', err);
        setLoading(false);
      });
  }, []);

  // Clear success message when component unmounts
  useEffect(() => {
    return () => {
      setSuccess(false);
    };
  }, []);

  const handleEdit = () => {
    setEditName(name);
    setEditEmail(email);
    setEditing(true);
    setSuccess(false);
    setError('');
  };

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/personalinfo_edit`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName, email: editEmail }),
      });

      if (res.status === 409) {
        setError('Email already exists. Please enter a different one.');
        return;
      }

      if (!res.ok) throw new Error('Failed to update');

      setName(editName);
      setEmail(editEmail);
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error('Error saving user info:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Link to="/settings" className="text-sm text-gray-700 hover:underline mb-4 inline-block">
        {t('back')}
      </Link>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1C8536]">
        <img src="/settings-icons/person.svg" alt="User" className="w-6 h-6" />
        {t('personalInfo')}
      </h2>

      {editing ? (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <label className="w-20">{t('name')}</label>
              <input
                className="flex-1 border rounded px-3 py-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20">{t('email')}</label>
              <input
                className="flex-1 border rounded px-3 py-2"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-600 bg-red-100 rounded px-3 py-2 text-sm mt-2">
                {error}
              </div>
            )}
            <button
              className="bg-[#86F022] text-white rounded py-2 px-4 mt-4 hover:bg-lime-500 self-end"
              onClick={handleSave}
            >
              {t('save')}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center bg-gray-100 rounded px-4 py-2 text-sm mb-2">
            <div>
              <div className="text-gray-600">{t('name')}</div>
              <div className="font-medium">{name}</div>
            </div>
            <img
              src="/settings-icons/Edit.svg"
              alt="Edit"
              className="w-5 h-5 cursor-pointer"
              onClick={handleEdit}
            />
          </div>
          <div className="flex justify-between items-center bg-gray-100 rounded px-4 py-2 text-sm">
            <div>
              <div className="text-gray-600">{t('email')}</div>
              <div className="font-medium">{email}</div>
            </div>
            <img
              src="/settings-icons/Edit.svg"
              alt="Edit"
              className="w-5 h-5 cursor-pointer"
              onClick={handleEdit}
            />
          </div>
        </>
      )}

      {success && (
        <div className="mt-4 text-center bg-[#86F022] text-white rounded py-2 px-4 shadow">
          Saved!
        </div>
      )}
    </>
  );
}