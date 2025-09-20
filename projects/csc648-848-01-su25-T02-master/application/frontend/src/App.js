/**
 * @file App.js
 * @summary Defines the main routing structure of the application using React Router and layout wrappers.  
 * Separates public, authenticated, and settings views while injecting reminder and authentication logic.  
 * Routes are grouped and nested under layouts to control access and UI structure across pages.
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReminderWatcher from './components/ReminderWatcher';
import { setUserLanguage } from './i18n';

// IMPORT LAYOUTS
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import SettingsLayout from './layouts/SettingsLayout';

// IMPORT MAIN PAGES
import Home from './pages/Home/home';
import About from './pages/About/about';
import Signup from './pages/Signup/signup';
import Signin from './pages/Signin/signin';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

// IMPORT USER LOGIN PAGES
import Accounts from "./pages/UserLoginPages/Accounts/Accounts";
import AddAccount from './pages/UserLoginPages/Accounts/addAccount';
import Budget from './pages/UserLoginPages/Budget/Budget';
import Dashboard from './pages/UserLoginPages/Dashboard/Dashboard';
import LemonAid from './pages/UserLoginPages/LemonAid/LemonAid';
import Admin from './pages/UserLoginPages/Admin/Admin';
import AdminSupport from './pages/UserLoginPages/Admin/AdminSupport';
import AdminFlaggedTransactions from './pages/UserLoginPages/Admin/AdminFlaggedTransactions';
import AdminReimbursements from './pages/UserLoginPages/Admin/AdminReimbursements';
import TransactionPage from './pages/UserLoginPages/Accounts/Transactions/TransactionPage';
import ReimbursementRequest from './pages/UserLoginPages/Accounts/Transactions/ReimbursementRequest/ReimbursementRequest';
import CurrencyConvert from './pages/UserLoginPages/Accounts/Transactions/CurrencyConvert';
import BalanceForecast from './pages/UserLoginPages/BalanceForecast/BalanceForecast';

// IMPORT SETTINGS PAGES
import Settings from './pages/UserLoginPages/Settings/Settings';
import PersonalInfo from './pages/UserLoginPages/Settings/SettingsSubPages/PersonalInfo/PersonalInfo';
import Support from './pages/UserLoginPages/Settings/SettingsSubPages/Support/Support';
import Reviews from './pages/UserLoginPages/Settings/SettingsSubPages/Reviews/Reviews';
import NotificationsReminders from './pages/UserLoginPages/Settings/SettingsSubPages/NotificationsReminders/NotificationsReminders';
import DeleteAccount from './pages/UserLoginPages/Settings/SettingsSubPages/DeleteAccount/DeleteAccount';
import SignOut from './pages/UserLoginPages/Settings/SettingsSubPages/SignOut/SignOut';
import LanguageSettings from './pages/UserLoginPages/Settings/SettingsSubPages/Language/Language';

// AUTH GATE COMPONENT
import AuthGate from './components/AuthGate';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  useEffect(() => {
    setUserLanguage();
  }, []);

  return (
    <Router>
      {/* for notification */}
      <ReminderWatcher />

      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Logged-in Layout */}
        <Route path="/" element={<UserLayout />}>

          {/* USER LOGIN PAGES */}
          <Route path="accounts" element={<Accounts />} />
          <Route path="add-account" element={<AddAccount />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="budget" element={<Budget />} />
          <Route path="lemonaid" element={<LemonAid />} />
                        <Route path="admin" element={<Admin />} />
              <Route path="admin/support" element={<AdminSupport />} />
              <Route path="admin/flagged-transactions" element={<AdminFlaggedTransactions />} />
              <Route path="admin/reimbursements" element={<AdminReimbursements />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="reimbursement-request" element={<ReimbursementRequest />} />
          <Route path="currency-convert" element={<CurrencyConvert />} />
          <Route path="balance-forecast" element={<BalanceForecast />} />

          {/* SETTINGS PAGES (Protected by AuthGate) */}
          <Route
            path="settings"
            element={
              <AuthGate>
                <SettingsLayout />
              </AuthGate>
            }
          >
            <Route index element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="notifications-reminders" element={<NotificationsReminders />} />
            <Route path="language" element={<LanguageSettings />} />
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="signout" element={<SignOut />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;// test change
