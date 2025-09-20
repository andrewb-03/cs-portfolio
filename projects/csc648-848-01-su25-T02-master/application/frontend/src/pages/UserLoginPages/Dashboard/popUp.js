// ==============================================
// TRANSACTION POPUP
// ==============================================

/**
 * @file popUp.js
 * @summary Custom React hook that manages dropdown menu visibility and editable note state for transactions.  
 * Supports toggling menus, initiating edit mode, and handling cancel/save actions for subscription entries.  
 * Used by the Dashboard Transactions subpage to power ︙ menu behavior and inline editing.
 */

import { useState, useEffect } from 'react';

function useDropdown() {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editedNote, setEditedNote] = useState('');
  const [cancelledSubscriptions, setCancelledSubscriptions] = useState(new Set());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is on a dropdown toggle or dropdown menu
      const isDropdownClick = event.target.closest('.subscription-dropdown');
      if (!isDropdownClick && dropdownVisible !== null) {
        setDropdownVisible(null);
      }
    };

    // Add event listener if dropdown is visible
    if (dropdownVisible !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  const toggleDropdown = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleEdit = (id, currentNote) => {
    setIsEditing(id);
    setEditedNote(currentNote);
    setDropdownVisible(null);
  };

  const handleCancelClick = (subscriptionId, merchantName) => {
    console.log('Cancel clicked for:', subscriptionId, merchantName); // Debug log
    setSubscriptionToCancel({ id: subscriptionId, name: merchantName });
    setShowCancelConfirm(true);
    setDropdownVisible(null);
  };

  const confirmCancel = () => {
    if (subscriptionToCancel) {
      console.log('Confirming cancel for:', subscriptionToCancel.id); // Debug log
      setCancelledSubscriptions(prev => new Set([...prev, subscriptionToCancel.id]));
      setShowCancelConfirm(false);
      setSubscriptionToCancel(null);
    }
  };

  const cancelCancel = () => {
    setShowCancelConfirm(false);
    setSubscriptionToCancel(null);
  };

  const handleSave = () => {
    setIsEditing(null);
  };

  return {
    dropdownVisible,
    setDropdownVisible,
    isEditing,
    setIsEditing,
    editedNote,
    setEditedNote,
    cancelledSubscriptions,
    showCancelConfirm,
    subscriptionToCancel,
    toggleDropdown,
    handleEdit,
    handleCancelClick,
    confirmCancel,
    cancelCancel,
    handleSave
  };
}

export default useDropdown;
