/**
 * @file BalanceForecast.js
 * @summary Displays editable forecast tables for future income and food expenses with real-time total calculations.  
 * Allows inline editing, row deletion, and user-driven projections for upcoming budget scenarios.  
 * Applies a tabular UI with reusable render logic for each cell and dynamic state management.
 */

import React, { useState } from 'react';
import './BalanceForecast.css';
import AuthGate from '../../../components/AuthGate';

function BalanceForecast() {
  const [incomeData, setIncomeData] = useState([
    { id: 1, date: '6/6/2025', source: 'Job A', notes: '', amount: 500.00, isEditing: false },
    { id: 2, date: '6/20/2025', source: 'Job A', notes: '', amount: 500.00, isEditing: false }
  ]);

  const [foodData, setFoodData] = useState([
    { id: 1, date: '6/7/2025', merchant: 'Whole Foods', notes: 'Whole Foods Grocery', amount: 200.00, isEditing: false },
    { id: 2, date: '6/21/2025', merchant: 'Chipotle', notes: 'Party Potluck???', amount: 75.00, isEditing: false }
  ]);

  const [editingCell, setEditingCell] = useState(null);

  const handleEdit = (section, id, field) => {
    setEditingCell({ section, id, field });
  };

  const handleSave = (section, id, field, value) => {
    if (section === 'income') {
      setIncomeData(prev => prev.map(item => 
        item.id === id ? { ...item, [field]: field === 'amount' ? parseFloat(value) || 0 : value, isEditing: false } : item
      ));
    } else {
      setFoodData(prev => prev.map(item => 
        item.id === id ? { ...item, [field]: field === 'amount' ? parseFloat(value) || 0 : value, isEditing: false } : item
      ));
    }
    setEditingCell(null);
  };

  const deleteRow = (section, id) => {
    if (section === 'income') {
      setIncomeData(prev => prev.filter(item => item.id !== id));
    } else {
      setFoodData(prev => prev.filter(item => item.id !== id));
    }
  };

  const calculateTotal = (data) => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  };

  const renderCell = (item, field, section) => {
    const isEditing = editingCell && editingCell.section === section && editingCell.id === item.id && editingCell.field === field;
    
    if (isEditing) {
      return (
        <input
          type={field === 'amount' ? 'number' : field === 'date' ? 'date' : 'text'}
          defaultValue={field === 'date' ? item[field] : item[field]}
          onBlur={(e) => handleSave(section, item.id, field, e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSave(section, item.id, field, e.target.value);
            }
          }}
          autoFocus
          className="cell-input"
        />
      );
    }

    return (
      <div 
        className="cell-content clickable"
        onClick={() => handleEdit(section, item.id, field)}
      >
        <span>{field === 'amount' ? `$${item[field].toFixed(2)}` : item[field]}</span>
        {field === 'source' || field === 'merchant' ? <span className="dropdown-arrow">▼</span> : null}
      </div>
    );
  };

  return (
    <AuthGate>
      <div className="balance-forecast-bg">
        <div className="balance-forecast-header-bubble">
          <h1 className="balance-forecast-header-title">Forecast Balance</h1>
        </div>
        <div className="balance-forecast-main-card">
          <div className="balance-forecast-card">
            {/* Income Section */}
            <div className="forecast-section">
              <div className="section-header income-header">
                <h3>Income</h3>
              </div>
              <div className="table-container">
                <table className="forecast-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Source</th>
                      <th>Notes</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeData.map((item) => (
                      <tr key={item.id}>
                        <td>{renderCell(item, 'date', 'income')}</td>
                        <td>{renderCell(item, 'source', 'income')}</td>
                        <td>{renderCell(item, 'notes', 'income')}</td>
                        <td>{renderCell(item, 'amount', 'income')}</td>
                        <td className="action-buttons">
                          <button className="action-btn approve">✓</button>
                          <button 
                            className="action-btn reject"
                            onClick={() => deleteRow('income', item.id)}
                          >
                            ✗
                          </button>
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEdit('income', item.id, 'amount')}
                            title="Edit Amount"
                          >
                            <img src="/navbar-icons/Edit.png" alt="Edit" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="3">Total Income</td>
                      <td>${calculateTotal(incomeData).toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Food Section */}
            <div className="forecast-section">
              <div className="section-header food-header">
                <h3>Food</h3>
              </div>
              <div className="table-container">
                <table className="forecast-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Merchant</th>
                      <th>Notes</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodData.map((item) => (
                      <tr key={item.id}>
                        <td>{renderCell(item, 'date', 'food')}</td>
                        <td>{renderCell(item, 'merchant', 'food')}</td>
                        <td>{renderCell(item, 'notes', 'food')}</td>
                        <td>{renderCell(item, 'amount', 'food')}</td>
                        <td className="action-buttons">
                          <button className="action-btn approve">✓</button>
                          <button 
                            className="action-btn reject"
                            onClick={() => deleteRow('food', item.id)}
                          >
                            ✗
                          </button>
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEdit('food', item.id, 'amount')}
                            title="Edit Amount"
                          >
                            <img src="/navbar-icons/Edit.png" alt="Edit" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="3">Total</td>
                      <td>${calculateTotal(foodData).toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}

export default BalanceForecast; 