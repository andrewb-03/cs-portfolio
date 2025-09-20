/**
 * @file home.js
 * @summary Renders the marketing homepage with a hero section, call-to-action, and feature highlights.  
 * Promotes app capabilities like budgeting, tracking, currency conversion, and reimbursements.  
 * Designed with a responsive layout and visual illustrations to engage new users.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const { t } = useTranslation('home');
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <Link to="/signup" className="hero-button">{t('hero.cta')}</Link>
        </div>
        <img src="/images/lemoncute.png" alt="Charts and savings illustration" className="hero-image" draggable="false"/>
      </section>

      {/* Feature Section */}
      <section className="features">
        <div className="feature">
          <h3>{t('features.track.title')}</h3>
          <p>{t('features.track.desc')}</p>
        </div>
        <div className="feature">
          <h3>{t('features.budget.title')}</h3>
          <p>{t('features.budget.desc')}</p>
        </div>
        <div className="feature">
          <h3>{t('features.reimburse.title')}</h3>
          <p>{t('features.reimburse.desc')}</p>
        </div>
        <div className="feature">
          <h3>{t('features.currency.title')}</h3>
          <p>{t('features.currency.desc')}</p>
        </div>
        <div className="feature">
          <h3>{t('features.safe.title')}</h3>
          <p>{t('features.safe.desc')}</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
