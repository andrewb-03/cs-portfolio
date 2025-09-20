import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import '../../../layouts/UserLayout.css';
import './Dashboard.css';
import DashTrans from './DashTrans';
import DashReim from './DashReim';
import AuthGate from '../../../components/AuthGate';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation('dashboard'); // Use 'dashboard' namespace
  // State to store all transactions fetched from the database table
  const [transactions, setTransactions] = useState([]);

  // State to store pie chart data, initialized with categories and their respective colors
  const [pieData, setPieData] = useState([]);

  // State to manage the currently active tab (e.g., main, transactions, reimbursements)
  const [activeTab, setActiveTab] = useState('main');

  // State to store bar chart data
  const [barData, setBarData] = useState([]);

  // Static data for gauge chart representing credit score
  const gaugeData = [
    { name: 'Credit Score', value: 630, fill: '#ff9800' },
  ];

  // Add this to your existing Dashboard.js imports
  const [newTransactionsCount, setNewTransactionsCount] = useState(0);

  // Add Privacy Mode state
  const privacyMode = localStorage.getItem('privacyMode') === 'true';
  // Fetch transactions from the backend database
  useEffect(() => {
    if (privacyMode) {
      fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/manual-transactions/all`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setTransactions(data);
        })
        .catch((err) => console.error('Failed to fetch manual transactions:', err));
    } else {
      fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setTransactions(data);
        })
        .catch((err) => console.error('Failed to fetch transactions:', err));
    }
  }, [privacyMode]);

  // Add this useEffect to check for new transactions
  useEffect(() => {
    const checkNewTransactions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions/recent`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          // Check for transactions from last 24 hours
          const recentTransactions = data.transactions.filter(tx => {
            const txDate = new Date(tx.date);
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            return txDate > yesterday;
          });
          
          setNewTransactionsCount(recentTransactions.length);
        }
      } catch (error) {
        console.error('Error checking new transactions:', error);
      }
    };

    // Check every 5 minutes
    const interval = setInterval(checkNewTransactions, 5 * 60 * 1000);
    checkNewTransactions(); // Check immediately

    return () => clearInterval(interval);
  }, []);

  // Add this useEffect to check for new transactions
  useEffect(() => {
    const checkNewTransactions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/transactions/recent`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          // Check for transactions from last 24 hours
          const recentTransactions = data.transactions.filter(tx => {
            const txDate = new Date(tx.date);
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
            return txDate > yesterday;
          });
          
          setNewTransactionsCount(recentTransactions.length);
        }
      } catch (error) {
        console.error('Error checking new transactions:', error);
      }
    };

    // Check every 5 minutes
    const interval = setInterval(checkNewTransactions, 5 * 60 * 1000);
    checkNewTransactions(); // Check immediately

    return () => clearInterval(interval);
  }, []);

  // Dynamically build pieData from transactions
  useEffect(() => {
    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter for expenses in the current month
    const filteredExpenses = transactions.filter(tx => {
      if (tx.type !== 'expense') return false;
      const txDate = new Date(tx.date);
      return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
    });

    // Group by category and sum amounts
    const categoryMap = {};
    filteredExpenses.forEach(tx => {
      const cat = tx.pfcPrimary || tx.category || 'Uncategorized';
      if (!categoryMap[cat]) {
        categoryMap[cat] = 0;
      }
      categoryMap[cat] += parseFloat(tx.amount) || 0;
    });

    // Generate a color for each category (simple hash for demo)
    const getColor = (cat) => {
      let hash = 0;
      for (let i = 0; i < cat.length; i++) {
        hash = cat.charCodeAt(i) + ((hash << 5) - hash);
      }
      const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
      return "#" + "00000".substring(0, 6 - c.length) + c;
    };

    // Build pieData array
    const dynamicPieData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
      color: getColor(name),
    }));

    setPieData(dynamicPieData);
  }, [transactions]);

  // Calculate bar data for income and spent amounts over months
  useEffect(() => {
    const calculateBarData = () => {
      const now = new Date();
      const months = [
        new Date(now.getFullYear(), now.getMonth() - 2).toLocaleString('default', { month: 'long' }),
        new Date(now.getFullYear(), now.getMonth() - 1).toLocaleString('default', { month: 'long' }),
        new Date(now.getFullYear(), now.getMonth()).toLocaleString('default', { month: 'long' }),
      ];

      // Map through the months to create monthly data
      const monthlyData = months.map((month, index) => {
        const filteredTransactions = transactions.filter((tx) => {
          const date = new Date(tx.date);
          return date.getMonth() === now.getMonth() - (2 - index) && date.getFullYear() === now.getFullYear();
        });

        // Calculate total income (deposits) for the month
        const totalIncome = filteredTransactions
          .filter((tx) => tx.type === 'income') // Filters transactions of type 'income'
          .reduce((sum, tx) => sum + parseFloat(tx.amount), 0); // Sums up the amounts

        // Calculate total spent (withdrawals) for the month
        const totalSpent = filteredTransactions
          .filter((tx) => tx.type === 'expense') // Filters transactions of type 'expense'
          .reduce((sum, tx) => sum + parseFloat(tx.amount), 0); // Sums up the amounts

        return { month, Income: totalIncome, Spent: totalSpent };
      });

      setBarData(monthlyData);
    };

    calculateBarData();
  }, [transactions]);

  return (
    <AuthGate>
      <div className="dashboard-bg">
        <div className="dashboard-header-card">
          <h1 className="dashboard-header-title">{t('Dashboard')}</h1>
        </div>

        {/* Button Toggle */}
        <div className="dashboard-button-toggles">
          <button
            className={"dashboard-toggle-button " + (activeTab === 'main' ? 'active' : '')}
            onClick={() => setActiveTab('main')}
          >
            {t('main')}
          </button>

          <button
            className={"dashboard-toggle-button " + (activeTab === 'transactions' ? 'active' : '')}
            onClick={() => setActiveTab('transactions')}
          >
            {t('transactions')}
          </button>
          <button
            className={"dashboard-toggle-button " + (activeTab === 'reimbursements' ? 'active' : '')}
            onClick={() => setActiveTab('reimbursements')}
          >
            {t('reimbursements')}
          </button>
        </div>
        {/* Button Toggle */}

        <div className="dashboard-main-card">
          {activeTab === 'main' && (
            <>
              {/* Budget Report Section */}
              <section className="dashboard-section">
                <h2 className="dashboard-section-title">{t('budgetReportTitle', { month: '06', year: '2025' })}</h2>
                <div className="dashboard-charts-row">
                  <div className="dashboard-pie-placeholder">
                    {/* Pie Chart Section */}
                    <ResponsiveContainer width={200} height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={50}
                          labelLine={false}
                          label={({ name, percent }) => (percent > 0.08 ? name : '')}
                        >
                          {pieData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="dashboard-legend-row">
                      {pieData.map((item) => (
                        <div key={item.name} className="dashboard-legend-item">
                          <span
                            className="legend-dot"
                            style={{ backgroundColor: item.color }}
                          ></span>
                          <span className="legend-label">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="dashboard-bar-placeholder">
                    <ResponsiveContainer width={220} height={120}>
                      <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="Income" fill="#1c8536" barSize={18} />
                        <Bar dataKey="Spent" fill="#e53935" barSize={18} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="dashboard-bar-legend">
                      <span className="legend-dot income"></span> {t('incomeLegend')}
                      <span className="legend-dot spent"></span> {t('spentLegend')}
                    </div>
                  </div>
                </div>
              </section>
              <hr />
            </>
          )}
          
          {activeTab === 'transactions' && <DashTrans />}
          {activeTab === 'reimbursements' && <DashReim/>}
        </div>
        {newTransactionsCount > 0 && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
    <div className="flex items-center">
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span>
        {t('newTransactions', {
          count: newTransactionsCount,
          plural: newTransactionsCount !== 1 ? 's' : ''
        })}
      </span>

    </div>
  </div>
)}
      </div>
    </AuthGate>
  );
}

export default Dashboard;