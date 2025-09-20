/**
 * @file Budget.js
 * @summary Implements a tabbed spreadsheet interface for entering income, allocating budgets, and planning expenses.  
 * Allows users to dynamically add, remove, and edit entries across income and spending categories.  
 * Calculates totals and leftover income with support for both planned and actual spending views.
 */

/* Importing this library to implement a spreadsheet-like budget management system
 This code is part of a React application for managing user budgets -Dani */
/* eslint-disable */
//MOCKED CHAT --------------------------------------------------------------------------------------------------------------------------------------------
// import React, { useState, useEffect, useRef } from 'react';
// import './Budget.css';
// import AuthGate from '../../../components/AuthGate';

// export default function Budget() {
//   const staticCategories = [
//     'ENTERTAINMENT',
//     'GENERAL_MERCHANDISE',
//     'FOOD_AND_DRINK',
//     'LOAN_PAYMENTS',
//     'TRANSPORTATION',
//     'GENERAL_SERVICES',
//     'PERSONAL_CARE',
//     'TRAVEL'
//     // 'INCOME'
//   ];

//   const [transactions, setTransactions] = useState([]);
//   const [budgetCategories, setBudgetCategories] = useState(
//     staticCategories.map(category => ({
//       category,
//       limit: 0,
//       _confirmed: false
//     }))
//   );

//   const [showBudgetChat, setShowBudgetChat] = useState(false);
//   const [pendingBudgetPlan, setPendingBudgetPlan] = useState(null);
//   const [chat, setChat] = useState([
//     { sender: 'LemonAid', text: "Hi! I'm LemonAid. Ask me anything about your budget! Ex:Make me a budget for July 2025" },
//   ]);
//   const [userInput, setUserInput] = useState('');
//   const chatRef = useRef(null);

//   const now = new Date();
//   const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
//   const [selectedYear, setSelectedYear] = useState(now.getFullYear());
//   const [totalBudget, setTotalBudget] = useState(0);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions`, {
//       credentials: 'include',
//     })
//       .then(res => res.json())
//       .then(data => Array.isArray(data) && setTransactions(data))
//       .catch(err => console.error('Failed to fetch transactions:', err));
//   }, []);

//   useEffect(() => {
//     fetch(
//       `${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget?year=${selectedYear}&month=${selectedMonth}`,
//       { credentials: 'include' }
//     )
//       .then(res => res.json())
//       .then(data => {
//         const updated = budgetCategories.map(row => {
//           const match = data.find(b => b.category === row.category);
//           return match
//             ? { ...row, limit: parseFloat(match.limitAmount), _confirmed: true }
//             : { ...row, limit: 0, _confirmed: false };
//         });
//         setBudgetCategories(updated);
//       })
//       .catch(err => console.error('Error loading budget data:', err));
//   }, [selectedMonth, selectedYear]);

//   const handleLimitChange = (index, value) => {
//     const updated = [...budgetCategories];
//     updated[index].limit = parseFloat(value) || 0;
//     updated[index]._confirmed = false;
//     setBudgetCategories(updated);
//   };

//   const handleTotalBudgetChange = (value) => {
//     setTotalBudget(parseFloat(value) || 0);
//   };

//   const filterByMonthYear = (tx) => {
//     if (!tx.date) return false;
//     const date = new Date(tx.date);
//     return (
//       date.getFullYear() === parseInt(selectedYear) &&
//       date.getMonth() === parseInt(selectedMonth)
//     );
//   };

//   const filteredExpenses = transactions.filter(
//     tx => tx.type === 'expense' && filterByMonthYear(tx)
//   );
//   const filteredIncome = transactions.filter(
//     tx => tx.type === 'income' && filterByMonthYear(tx)
//   );
//   const totalIncome = filteredIncome.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

//   const getCategorySpending = (category, limit) => {
//     const spent = filteredExpenses
//       .filter(tx => tx.pfcPrimary === category)
//       .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
//     const remaining = limit - spent;
//     return {
//       spent: spent.toFixed(2),
//       remaining: remaining.toFixed(2),
//     };
//   };

//   const calculateTotalSpent = () => {
//     return budgetCategories
//       .filter(row => row._confirmed && row.limit > 0)
//       .reduce((sum, row) => {
//         const { spent } = getCategorySpending(row.category, row.limit);
//         return sum + parseFloat(spent);
//       }, 0)
//       .toFixed(2);
//   };

//   const calculateRemainingTotal = () => {
//     return budgetCategories
//       .filter(row => row._confirmed && row.limit > 0)
//       .reduce((sum, row) => {
//         const { remaining } = getCategorySpending(row.category, row.limit);
//         return sum + parseFloat(remaining);
//       }, 0)
//       .toFixed(2);
//   };

//   const getMonthLabel = (monthIndex) =>
//     new Date(0, monthIndex).toLocaleString('default', { month: 'long' });

//   const handleBudgetSubmit = async () => {
//     const trimmed = userInput.trim();
//     if (!trimmed) return;

//     setChat((prev) => [...prev, { sender: 'You', text: trimmed }]);
//     setUserInput('');

//     const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget-chat`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({
//         query: trimmed,
//         transactions,
//         budgets: budgetCategories,
//         year: selectedYear,
//         month: selectedMonth,
//       })
//     });

//     const data = await response.json();
//     setChat((prev) => [...prev, { sender: 'LemonAid', text: data.reply }]);

//     if (typeof data.parsedMonth === 'number' && typeof data.parsedYear === 'number') {
//       console.log('🟢 LemonAid override:', data.parsedMonth, data.parsedYear);
//       setSelectedMonth(data.parsedMonth);
//       setSelectedYear(data.parsedYear);
//     }

//     const lines = data.reply.split('\n');
//     const plan = lines
//       .map(line => {
//         const [cat, amt] = line.split(':');
//         if (!cat || !amt || !amt.includes('$')) return null;
//         const amount = parseFloat(amt.replace('$', '').trim());
//         return isNaN(amount) ? null : {
//           category: cat.trim(),
//           limitAmount: amount
//         };
//       })
//       .filter(Boolean);

//     if (plan.length > 0) {
//       setPendingBudgetPlan(plan);
//     }
//   };

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [chat]);

//   const yearOptions = Array.from({ length: 7 }, (_, i) => now.getFullYear() - 3 + i);

//   return (
//     <AuthGate>
//       <div className="budget-bg">
//         <div className="budget-page">
//           <div className="budget-heading-card" style={{ position: 'relative' }}>
//             <h1 className="section-title">Budget</h1>
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '0',
//                 right: '-10rem',
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center'
//               }}
//             >
//               <img
//                 src="/navbar-icons/LemonBudgetAIButton.png"
//                 alt="LemonBudget AI"
//                 title="Chat with LemonAid Budget Assistant"
//                 onClick={() => setShowBudgetChat(true)}
//                 style={{
//                   height: '100px',
//                   width: '100px',
//                   cursor: 'pointer',
//                   borderRadius: '12px',
//                   boxShadow: '0 0 6px rgba(0,0,0,0.1)',
//                   background: 'white',
//                   padding: '1rem'
//                 }}
//               />
//             </div>
//             <div className="budget-tabs-row mt-3">
//               <div className="budget-tabs-group">
//                 <select
//                   value={selectedMonth}
//                   onChange={e => setSelectedMonth(parseInt(e.target.value))}
//                   className="budget-tab"
//                 >
//                   {Array.from({ length: 12 }, (_, i) => (
//                     <option key={i} value={i}>{getMonthLabel(i)}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={selectedYear}
//                   onChange={e => setSelectedYear(parseInt(e.target.value))}
//                   className="budget-tab"
//                 >
//                   {yearOptions.map(year => (
//                     <option key={year} value={year}>{year}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {showBudgetChat && (
//             <div className="budget-ai-popup" style={{ width: '400px', height: '450px' }}>
//               <div className="budget-ai-header">
//                 LemonAid Budget Assistant
//                 <button onClick={() => setShowBudgetChat(false)}>✖</button>
//               </div>
//               <div className="budget-ai-body" ref={chatRef}>
//                 {chat.map((msg, i) => (
//                   <div key={i} className={msg.sender === 'You' ? 'user-msg' : 'ai-msg'}>
//                     <strong>{msg.sender}:</strong> {msg.text}
//                   </div>
//                 ))}
//               </div>
//               <textarea
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleBudgetSubmit())}
//                 rows={2}
//                 placeholder="Ask me about your budget..."
//                 style={{ fontSize: '1rem', padding: '1rem', width: '100%', borderRadius: '8px', resize: 'none' }}
//               />
//               {pendingBudgetPlan && (
//                 <button
//                   onClick={async () => {
//                     try {
//                       const accountRes = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/accounts`, {
//                         credentials: 'include',
//                       });
//                       const accountData = await accountRes.json();
//                       const defaultAccountId = accountData?.[0]?.accountId;

//                       for (const item of pendingBudgetPlan) {
//                         const payload = {
//                           category: item.category,
//                           limitAmount: item.limitAmount,
//                           year: selectedYear,
//                           month: selectedMonth,
//                         };

//                         const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget`, {
//                           method: 'POST',
//                           headers: { 'Content-Type': 'application/json' },
//                           credentials: 'include',
//                           body: JSON.stringify(payload),
//                         });

//                         const result = await response.json();
//                         console.log('✅ Response:', result);
//                       }

//                       const res = await fetch(
//                         `${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget?year=${selectedYear}&month=${selectedMonth}`,
//                         { credentials: 'include' }
//                       );
//                       const data = await res.json();
//                       const updated = budgetCategories.map(row => {
//                         const match = data.find(b => b.category === row.category);
//                         return match
//                           ? { ...row, limit: parseFloat(match.limitAmount), _confirmed: true }
//                           : row;
//                       });
//                       setBudgetCategories(updated);
//                       setPendingBudgetPlan(null);
//                       alert("✅ Budget limits have been applied!");
//                     } catch (err) {
//                       console.error("❌ Failed to apply budget:", err);
//                       alert("Something went wrong while applying the budget.");
//                     }
//                   }}
//                   style={{
//                     marginTop: '0.5rem',
//                     background: '#22c55e',
//                     color: 'white',
//                     padding: '0.5rem 1rem',
//                     borderRadius: '8px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   ✅ Accept Budget Plan
//                 </button>
//               )}
//             </div>
//           )}

//           <div className="budget-container" style={{ marginBottom: '2rem' }}>
//             <div className="sheet-header">
//               <h3>Income</h3>
//             </div>
//             <div className="table-container">
//               <table className="budget-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Amount</th>
//                     <th>Account</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredIncome.length === 0 ? (
//                     <tr>
//                       <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>No income for this period.</td>
//                     </tr>
//                   ) : (
//                     filteredIncome.map((tx, i) => (
//                       <tr key={i}>
//                         <td>{tx.name || '—'}</td>
//                         <td>${parseFloat(tx.amount).toFixed(2)}</td>
//                         <td>{tx.accountName || '—'}</td>
//                         <td>{new Date(tx.date).toLocaleDateString()}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '500' }}>
//               <span>Total Income for {getMonthLabel(selectedMonth)} {selectedYear}:</span>
//               <span>${totalIncome.toFixed(2)}</span>
//             </div>
//           </div>

//           <div className="budget-container" style={{ marginBottom: '2rem' }}>
//             <div className="table-section mt-0">
//               <div className="sheet-header">
//                 <h3>Budget</h3>
//               </div>
//               <div className="table-container">
//                 <table className="budget-table">
//                   <thead>
//                     <tr>
//                       <th>Category</th>
//                       <th>Limit</th>
//                       <th>Spent</th>
//                       <th>Remaining</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold' }}>Total Available Budget:</td>
//                       <td colSpan="2" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                         <input
//                           type="number"
//                           value={totalBudget}
//                           onChange={(e) => handleTotalBudgetChange(e.target.value)}
//                           className="border border-gray-300 p-1 w-full"
//                           min="0"
//                         />
//                       </td>
//                     </tr>
//                     {budgetCategories.map((row, i) => {
//                       const isSet = row.limit > 0 && row._confirmed;
//                       const { spent, remaining } = getCategorySpending(row.category, row.limit);

//                       return (
//                         <tr key={i}>
//                           <td>{row.category}</td>
//                           <td style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                             <input
//                               type="number"
//                               value={row.limit}
//                               onChange={e => handleLimitChange(i, e.target.value)}
//                               className="border border-gray-300 p-1 w-full"
//                               min="0"
//                               disabled={isSet}
//                             />
//                             {!isSet ? (
//                               <button
//                                 className="add-button"
//                                 style={{ padding: '0.25rem 0.75rem' }}
//                                 onClick={() => {
//                                   fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget`, {
//                                     method: 'POST',
//                                     headers: {
//                                       'Content-Type': 'application/json',
//                                     },
//                                     credentials: 'include',
//                                     body: JSON.stringify({
//                                       category: row.category,
//                                       limitAmount: row.limit,
//                                       year: selectedYear,
//                                       month: selectedMonth,
//                                     }),
//                                   })
//                                     .then(res => res.json())
//                                     .then(() => {
//                                       const updated = [...budgetCategories];
//                                       updated[i]._confirmed = true;
//                                       setBudgetCategories(updated);
//                                     })
//                                     .catch(err => console.error('Error setting budget:', err));
//                                 }}
//                               >
//                                 Set Limit
//                               </button>
//                             ) : (
//                               <button
//                                 className="add-button"
//                                 style={{
//                                   background: '#f87171',
//                                   color: 'white',
//                                   padding: '0.25rem 0.75rem'
//                                 }}
//                                 onClick={() => {
//                                   fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget`, {
//                                     method: 'DELETE',
//                                     headers: {
//                                       'Content-Type': 'application/json',
//                                     },
//                                     credentials: 'include',
//                                     body: JSON.stringify({
//                                       category: row.category,
//                                       year: selectedYear,
//                                       month: selectedMonth,
//                                     }),
//                                   })
//                                     .then(res => res.json())
//                                     .then(() => {
//                                       const updated = [...budgetCategories];
//                                       updated[i].limit = 0;
//                                       updated[i]._confirmed = false;
//                                       setBudgetCategories(updated);
//                                     })
//                                     .catch(err => console.error('Error resetting budget:', err));
//                                 }}
//                               >
//                                 Reset
//                               </button>
//                             )}
//                           </td>
//                           <td>{isSet ? `$${spent}` : '---'}</td>
//                           <td>{isSet ? `$${remaining}` : '---'}</td>
//                         </tr>
//                       );
//                     })}
//                     {budgetCategories.some(row => row._confirmed && row.limit > 0) && (
//                       <tr className="total-row">
//                         <td></td>
//                         <td></td>
//                         <td style={{ backgroundColor: '#FFD700', textAlign: 'center', fontWeight: 'bold' }}>
//                           Total Spent: ${calculateTotalSpent()}
//                         </td>
//                         <td style={{ backgroundColor: '#FFD700', textAlign: 'center', fontWeight: 'bold' }}>
//                           Remaining Total: ${calculateRemainingTotal()}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AuthGate>
//   );
// }


























// //WORKING FOR OFFICIAL CHAT (NOT MOCKED)-----------------------------------------------------------------------------------------
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Budget.css';
import AuthGate from '../../../components/AuthGate';

export default function Budget() {
  const { t } = useTranslation('budget');

  const staticCategories = [
    'ENTERTAINMENT',
    'GENERAL_MERCHANDISE',
    'FOOD_AND_DRINK',
    'LOAN_PAYMENTS',
    'TRANSPORTATION',
    'GENERAL_SERVICES',
    'PERSONAL_CARE',
    'TRAVEL'
  ];

  const [transactions, setTransactions] = useState([]);
  const [budgetCategories, setBudgetCategories] = useState(
    staticCategories.map(category => ({
      category,
      limit: 0,
      _confirmed: false
    }))
  );

  const [showBudgetChat, setShowBudgetChat] = useState(false);
  const [pendingBudgetPlan, setPendingBudgetPlan] = useState(null);
  const [budgetPlanMonthYear, setBudgetPlanMonthYear] = useState(null);
  const [chat, setChat] = useState([
    { sender: 'LemonAid', text: "Hi! I'm LemonAid. Ask me anything about your budget! Ex: Make a budget for July 2025" },
  ]);
  const [userInput, setUserInput] = useState('');
  const chatRef = useRef(null);
  const navigate = useNavigate();

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [totalBudget, setTotalBudget] = useState(0);

  const privacyMode = localStorage.getItem('privacyMode') === 'true';
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            setChat(prev => [...prev, { sender: 'LemonAid', text: '⚠️ You are not logged in. Redirecting to login page...' }]);
            setTimeout(() => navigate('/login'), 2000);
            throw new Error('Unauthorized');
          }
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          console.log('✅ Fetched transactions:', data);
          setTransactions(data);
        } else {
          console.error('Transactions response is not an array:', data);
          setChat(prev => [...prev, { sender: 'LemonAid', text: '⚠️ Failed to load transactions. Please try again later.' }]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch transactions:', err);
        if (!err.message.includes('Unauthorized')) {
          setChat(prev => [...prev, { sender: 'LemonAid', text: '⚠️ Failed to load transactions. Please try again later.' }]);
        }
      });
  }, [navigate]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget?year=${selectedYear}&month=${selectedMonth}`,
      { credentials: 'include' }
    )
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        const updated = budgetCategories.map(row => {
          const match = data.find(b => b.category === row.category);
          return match
            ? { ...row, limit: parseFloat(match.limitAmount), _confirmed: true }
            : { ...row, limit: 0, _confirmed: false };
        });
        setBudgetCategories(updated);
      })
      .catch(err => console.error('Error loading budget data:', err));
  }, [selectedMonth, selectedYear]);

  const handleLimitChange = (index, value) => {
    const updated = [...budgetCategories];
    updated[index].limit = parseFloat(value) || 0;
    updated[index]._confirmed = false;
    setBudgetCategories(updated);
  };

  const handleTotalBudgetChange = (value) => {
    setTotalBudget(parseFloat(value) || 0);
  };

  const filterByMonthYear = (tx) => {
    if (!tx.date) return false;
    const date = new Date(tx.date);
    return (
      date.getFullYear() === parseInt(selectedYear) &&
      date.getMonth() === parseInt(selectedMonth)
    );
  };

  const filteredExpenses = transactions.filter(
    tx => tx.type === 'expense' && filterByMonthYear(tx)
  );
  const filteredIncome = transactions.filter(
    tx => tx.type === 'income' && filterByMonthYear(tx)
  );
  const totalIncome = filteredIncome.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);

  const getCategorySpending = (category, limit) => {
    const spent = filteredExpenses
      .filter(tx => tx.pfcPrimary === category)
      .reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);
    const remaining = limit - spent;
    return {
      spent: spent.toFixed(2),
      remaining: remaining.toFixed(2),
    };
  };

  const calculateTotalSpent = () => {
    return budgetCategories
      .filter(row => row._confirmed && row.limit > 0)
      .reduce((sum, row) => {
        const { spent } = getCategorySpending(row.category, row.limit);
        return sum + parseFloat(spent);
      }, 0)
      .toFixed(2);
  };

  const calculateRemainingTotal = () => {
    return budgetCategories
      .filter(row => row._confirmed && row.limit > 0)
      .reduce((sum, row) => {
        const { remaining } = getCategorySpending(row.category, row.limit);
        return sum + parseFloat(remaining);
      }, 0)
      .toFixed(2);
  };

  const getMonthLabel = (monthIndex) =>
    new Date(0, monthIndex).toLocaleString('default', { month: 'long' });

  const handleBudgetSubmit = async () => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    setChat((prev) => [...prev, { sender: 'You', text: trimmed }]);
    setUserInput('');

    console.log('Sending request:', { query: trimmed, year: selectedYear, month: selectedMonth });

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          query: trimmed,
          transactions,
          budgets: budgetCategories,
          year: selectedYear,
          month: selectedMonth
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response:', data);

      if (response.status === 400 || response.status === 429 || response.status === 503) {
        setChat((prev) => [...prev, { sender: 'LemonAid', text: data.reply }]);
        return;
      }

      // Add feedback about using averaged data
      const hasTransactions = transactions.length > 0;
      setChat((prev) => [...prev]);

      console.log('Raw reply:', data.reply);
      const lines = data.reply.split('\n').filter(line => line.trim());
      const plan = lines
        .map(line => {
          const [cat, amt] = line.split(':');
          if (!cat || !amt || !amt.includes('$')) {
            console.warn('Invalid line format:', line);
            return null;
          }
          const category = cat.trim();
          if (!staticCategories.includes(category)) {
            console.warn('Category not in staticCategories:', category);
            return null;
          }
          const amount = parseFloat(amt.replace('$', '').trim());
          if (isNaN(amount)) {
            console.warn('Invalid amount:', amt);
            return null;
          }
          return { category, limitAmount: amount };
        })
        .filter(Boolean);

      console.log('Parsed plan:', plan);

      if (plan.length > 0) {
        setChat((prev) => [...prev, { sender: 'LemonAid', text: data.reply }]);
        setPendingBudgetPlan(plan);
        setBudgetPlanMonthYear({ month: data.parsedMonth, year: data.parsedYear });
      } else {
        setChat((prev) => [
          ...prev,
          { sender: 'LemonAid', text: '⚠️ Invalid budget plan received. Some categories or amounts may be incorrect. Please try again.' }
        ]);
      }
    } catch (err) {
      console.error('Budget request failed:', err);
      setChat((prev) => [...prev, { sender: 'LemonAid', text: `⚠️ Failed to generate budget: ${err.message}. Please try again.` }]);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  const yearOptions = Array.from({ length: 7 }, (_, i) => now.getFullYear() - 3 + i);

  return (
    <AuthGate>
      <div className="budget-bg">
        <div className="budget-page">
          <div className="budget-heading-card" style={{ position: 'relative' }}>
            <h1 className="section-title">{t('budgetTitle')}</h1>
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '-10rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {!privacyMode && (
              <img
                src="/navbar-icons/LemonBudgetAIButton.png"
                alt="LemonBudget AI"
                title="Chat with LemonAid Budget Assistant"
                onClick={() => setShowBudgetChat(true)}
                style={{
                  height: '100px',
                  width: '100px',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  boxShadow: '0 0 6px rgba(0,0,0,0.1)',
                  background: 'white',
                  padding: '1rem'
                }}
              />
              )}
            </div>
            <div className="budget-tabs-row mt-3">
              <div className="budget-tabs-group">
                <select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(parseInt(e.target.value))}
                  className="budget-tab"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>{getMonthLabel(i)}</option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(parseInt(e.target.value))}
                  className="budget-tab"
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {showBudgetChat && (
            <div className="budget-ai-popup" style={{ width: '400px', height: '450px' }}>
              <div className="budget-ai-header">
                {t('lemonAidAssistant')}
                <button onClick={() => setShowBudgetChat(false)}>✖</button>
              </div>
              <div className="budget-ai-body" ref={chatRef}>
                {chat.map((msg, i) => (
                  <div key={i} className={msg.sender === 'You' ? 'user-msg' : 'ai-msg'}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </div>
                ))}
              </div>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleBudgetSubmit())}
                rows={2}
                placeholder={t('askBudgetPlaceholder')}
                style={{ fontSize: '1rem', padding: '1rem', width: '100%', borderRadius: '8px', resize: 'none' }}
              />
              {pendingBudgetPlan && (
                <button
                  onClick={async () => {
                    try {
                      for (const item of pendingBudgetPlan) {
                        const payload = {
                          category: item.category,
                          limitAmount: item.limitAmount,
                          year: budgetPlanMonthYear?.year || selectedYear,
                          month: budgetPlanMonthYear?.month || selectedMonth
                        };

                        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          credentials: 'include',
                          body: JSON.stringify(payload),
                        });

                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        const result = await response.json();
                        console.log('✅ Budget saved:', result);
                      }

                      // Update dropdowns to match the saved budget month/year
                      if (budgetPlanMonthYear) {
                        setSelectedMonth(budgetPlanMonthYear.month);
                        setSelectedYear(budgetPlanMonthYear.year);
                      }

                      const res = await fetch(
                        `${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget?year=${budgetPlanMonthYear?.year || selectedYear}&month=${budgetPlanMonthYear?.month || selectedMonth}`,
                        { credentials: 'include' }
                      );
                      if (!res.ok) throw new Error(`HTTP ${res.status}`);
                      const data = await res.json();
                      const updated = budgetCategories.map(row => {
                        const match = data.find(b => b.category === row.category);
                        return match
                          ? { ...row, limit: parseFloat(match.limitAmount), _confirmed: true }
                          : row;
                      });
                      setBudgetCategories(updated);
                      setPendingBudgetPlan(null);
                      setBudgetPlanMonthYear(null);
                      setChat((prev) => [...prev, { sender: 'LemonAid', text: `✅ Budget limits applied successfully for ${getMonthLabel(budgetPlanMonthYear?.month || selectedMonth)} ${budgetPlanMonthYear?.year || selectedYear}!` }]);
                    } catch (err) {
                      console.error('❌ Failed to apply budget:', err);
                      setChat((prev) => [...prev, { sender: 'LemonAid', text: '⚠️ Failed to apply budget. Please try again.' }]);
                    }
                  }}
                  style={{
                    marginTop: '0.5rem',
                    background: '#22c55e',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {t('acceptBudgetPlan')}
                </button>
              )}
            </div>
          )}

          <div className="budget-container" style={{ marginBottom: '2rem' }}>
            <div className="sheet-header">
              <h3>{t('incomeTitle')}</h3>
            </div>
            <div className="table-container">
              <table className="budget-table">
                <thead>
                  <tr>
                    <th>{t('name')}</th>
                    <th>{t('amount')}</th>
                    <th>{t('account')}</th>
                    <th>{t('date')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncome.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                        {t('noIncomePeriod')}
                      </td>
                    </tr>
                  ) : (
                    filteredIncome.map((tx, i) => (
                      <tr key={i}>
                        <td>{tx.name || '—'}</td>
                        <td>${parseFloat(tx.amount || 0).toFixed(2)}</td>
                        <td>{tx.accountName || '—'}</td>
                        <td>{new Date(tx.date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '500' }}>
              <span>
                {t('totalIncomeFor', { month: getMonthLabel(selectedMonth), year: selectedYear })}
              </span>
              <span>${totalIncome.toFixed(2)}</span>
            </div>
          </div>

          <div className="budget-container" style={{ marginBottom: '2rem' }}>
            <div className="table-section mt-0">
              <div className="sheet-header">
                <h3>{t('budgetTab')}</h3>
              </div>
              <div className="table-container">
                <table className="budget-table">
                  <thead>
                    <tr>
                      <th>{t('category')}</th>
                      <th>{t('limit')}</th>
                      <th>{t('spent')}</th>
                      <th>{t('remaining')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {t('totalAvailableBudget')}
                      </td>
                      <td colSpan="2" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="number"
                          value={totalBudget}
                          onChange={(e) => handleTotalBudgetChange(e.target.value)}
                          className="border border-gray-300 p-1 w-full"
                          min="0"
                        />
                      </td>
                    </tr>
                    {budgetCategories.map((row, i) => {
                      const isSet = row.limit > 0 && row._confirmed;
                      const { spent, remaining } = getCategorySpending(row.category, row.limit);

                      return (
                        <tr key={i}>
                          <td>{row.category}</td>
                          <td style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                              type="number"
                              value={row.limit}
                              onChange={e => handleLimitChange(i, e.target.value)}
                              className="border border-gray-300 p-1 w-full"
                              min="0"
                              disabled={isSet}
                            />
                            {!isSet ? (
                              <button
                                className="add-button"
                                style={{ padding: '0.25rem 0.75rem' }}
                                onClick={() => {
                                  fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    credentials: 'include',
                                    body: JSON.stringify({
                                      category: row.category,
                                      limitAmount: row.limit,
                                      year: selectedYear,
                                      month: selectedMonth
                                    }),
                                  })
                                    .then(res => {
                                      if (!res.ok) throw new Error(`HTTP ${res.status}`);
                                      return res.json();
                                    })
                                    .then(() => {
                                      const updated = [...budgetCategories];
                                      updated[i]._confirmed = true;
                                      setBudgetCategories(updated);
                                    })
                                    .catch(err => console.error('Error setting budget:', err));
                                }}
                              >
                                {t('setLimit')}
                              </button>
                            ) : (
                              <button
                                className="add-button"
                                style={{
                                  background: '#f87171',
                                  color: 'white',
                                  padding: '0.25rem 0.75rem'
                                }}
                                onClick={() => {
                                  fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/budget`, {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    credentials: 'include',
                                    body: JSON.stringify({
                                      category: row.category,
                                      year: selectedYear,
                                      month: selectedMonth
                                    }),
                                  })
                                    .then(res => {
                                      if (!res.ok) throw new Error(`HTTP ${res.status}`);
                                      return res.json();
                                    })
                                    .then(() => {
                                      const updated = [...budgetCategories];
                                      updated[i].limit = 0;
                                      updated[i]._confirmed = false;
                                      setBudgetCategories(updated);
                                    })
                                    .catch(err => console.error('Error resetting budget:', err));
                                }}
                              >
                                {t('reset')}
                              </button>
                            )}
                          </td>
                          <td>{isSet ? `$${spent}` : '---'}</td>
                          <td>{isSet ? `$${remaining}` : '---'}</td>
                        </tr>
                      );
                    })}
                    {budgetCategories.some(row => row._confirmed && row.limit > 0) && (
                      <tr className="total-row">
                        <td></td>
                        <td></td>
                        <td style={{ backgroundColor: '#FFD700', textAlign: 'center', fontWeight: 'bold' }}>
                          {t('totalSpent')}: ${calculateTotalSpent()}
                        </td>
                        <td style={{ backgroundColor: '#FFD700', textAlign: 'center', fontWeight: 'bold' }}>
                          {t('remainingTotal')}: ${calculateRemainingTotal()}
                        </td>
                      </tr>
                    )}
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