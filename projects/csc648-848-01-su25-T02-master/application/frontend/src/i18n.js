import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeEn from './locales/en/home.json';
import homeEs from './locales/es/home.json';
import homeHi from './locales/hi/home.json';
import homeEsMX from './locales/es-MX/home.json';
import homeHiLatn from './locales/hi-Latn/home.json';
import homeEsAR from './locales/es-AR/home.json';

import navbarEn from './locales/en/publicNavbar.json';
import navbarEs from './locales/es/publicNavbar.json';
import navbarHi from './locales/hi/publicNavbar.json';
import navbarEsMX from './locales/es-MX/publicNavbar.json';
import navbarHiLatn from './locales/hi-Latn/publicNavbar.json';
import navbarEsAR from './locales/es-AR/publicNavbar.json';

import aboutEn from './locales/en/about.json';
import aboutEs from './locales/es/about.json';
import aboutHi from './locales/hi/about.json';
import aboutEsMX from './locales/es-MX/about.json';
import aboutHiLatn from './locales/hi-Latn/about.json';
import aboutEsAR from './locales/es-AR/about.json';

import signinEn from './locales/en/signin.json';
import signinEs from './locales/es/signin.json';
import signinHi from './locales/hi/signin.json';
import signinEsMX from './locales/es-MX/signin.json';
import signinHiLatn from './locales/hi-Latn/signin.json';
import signinEsAR from './locales/es-AR/signin.json';

import signupEn from './locales/en/signup.json';
import signupEs from './locales/es/signup.json';
import signupHi from './locales/hi/signup.json';
import signupEsMX from './locales/es-MX/signup.json';
import signupHiLatn from './locales/hi-Latn/signup.json';
import signupEsAR from './locales/es-AR/signup.json';

import settingsEn from './locales/en/settings.json';
import settingsEs from './locales/es/settings.json';
import settingsHi from './locales/hi/settings.json';
import settingsEsMX from './locales/es-MX/settings.json';
import settingsHiLatn from './locales/hi-Latn/settings.json';
import settingsEsAR from './locales/es-AR/settings.json';


import dashboardEn from './locales/en/dashboard.json';
import dashboardEs from './locales/es/dashboard.json';
import dashboardHi from './locales/hi/dashboard.json';
import dashboardEsMX from './locales/es-MX/dashboard.json';
import dashboardHiLatn from './locales/hi-Latn/dashboard.json';
import dashboardEsAR from './locales/es-AR/dashboard.json';

import transactionsEn from './locales/en/transactions.json';
import transactionsEs from './locales/es/transactions.json';
import transactionsHi from './locales/hi/transactions.json';
import transactionsEsMX from './locales/es-MX/transactions.json';
import transactionsHiLatn from './locales/hi-Latn/transactions.json';
import transactionsEsAR from './locales/es-AR/transactions.json';

import budgetEn from './locales/en/budget.json';
import budgetEs from './locales/es/budget.json';
import budgetHi from './locales/hi/budget.json';
import budgetEsMX from './locales/es-MX/budget.json';
import budgetHiLatn from './locales/hi-Latn/budget.json';
import budgetEsAR from './locales/es-AR/budget.json';

import reimburseEn from './locales/en/reimburse.json';
import reimburseEs from './locales/es/reimburse.json';
import reimburseHi from './locales/hi/reimburse.json';
import reimburseEsMX from './locales/es-MX/reimburse.json';
import reimburseHiLatn from './locales/hi-Latn/reimburse.json';
import reimburseEsAR from './locales/es-AR/reimburse.json';

import currencyEn from './locales/en/currency.json';
import currencyEs from './locales/es/currency.json';
import currencyHi from './locales/hi/currency.json';
import currencyEsMX from './locales/es-MX/currency.json';
import currencyHiLatn from './locales/hi-Latn/currency.json';
import currencyEsAR from './locales/es-AR/currency.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEn,
        navbar: navbarEn,
        about: aboutEn,
        signin: signinEn,
        signup: signupEn,

        settings: settingsEn,
        dashboard: dashboardEn,
        transactions: transactionsEn,
        budget: budgetEn,
        reimburse: reimburseEn,
        currency: currencyEn,

      },
      es: {
        home: homeEs,
        navbar: navbarEs,
        about: aboutEs,
        signin: signinEs,
        signup: signupEs,
        settings: settingsEs,
        dashboard: dashboardEs,
        transactions: transactionsEs,
        budget: budgetEs,
        reimburse: reimburseEs,
        currency: currencyEs,

      },
      hi: {
        home: homeHi,
        navbar: navbarHi,
        about: aboutHi,
        signin: signinHi,
        signup: signupHi,
        settings: settingsHi,
        dashboard: dashboardHi,
        transactions: transactionsHi,
        budget: budgetHi,
        reimburse: reimburseHi,
        currency: currencyHi,
      },
      'es-MX': {
        home: homeEsMX,
        navbar: navbarEsMX,
        about: aboutEsMX,
        signin: signinEsMX,
        signup: signupEsMX,
        settings: settingsEsMX,
        dashboard: dashboardEsMX,
        transactions: transactionsEsMX,
        budget: budgetEsMX,
        reimburse: reimburseEsMX,
        currency: currencyEsMX,
      },
      'hi-Latn': {
        home: homeHiLatn,
        navbar: navbarHiLatn,
        about: aboutHiLatn,
        signin: signinHiLatn,
        signup: signupHiLatn,
        settings: settingsHiLatn,
        dashboard: dashboardHiLatn,
        transactions: transactionsHiLatn,
        budget: budgetHiLatn,
        reimburse: reimburseHiLatn,
        currency: currencyHiLatn,
      },
      'es-AR': {
        home: homeEsAR,
        navbar: navbarEsAR,
        about: aboutEsAR,
        signin: signinEsAR,
        signup: signupEsAR,
        settings: settingsEsAR,
        dashboard: dashboardEsAR,
        transactions: transactionsEsAR,
        budget: budgetEsAR,
        reimburse: reimburseEsAR,
        currency: currencyEsAR,
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: [
      'home', 'navbar', 'about', 'signin', 'signup', 'settings', 'dashboard',
      'transactions', 'budget', 'reimburse', 'currency'
    ],
    defaultNS: 'home',
    interpolation: { escapeValue: false }
  });

export async function setUserLanguage() {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/language`, {
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.language) {
        i18n.changeLanguage(data.language);
      }
    }
  } catch (err) {
    // fallback to default
  }
}

export default i18n;
