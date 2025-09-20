import React from 'react';
import { useTranslation } from 'react-i18next';
import './about.css';

function About() {
  const { t } = useTranslation('about');
  return (
    <div className="about-page">
      <div className="mission-text">
        <h1>{t('missionTitle')}</h1>
        <p>{t('missionText')}</p>
      </div>
      <div className="about-text">
        <p>{t('aboutTitle')}</p>
      </div>
      <div className="team-container">
        <div className="team-member">
          <img src="/images/teammate1.jpg" alt="Teammate 1" className="team-photo" />
          <p id="team-member-name-and-role">{t('team.emily.name')}</p>
          <p>{t('team.emily.desc')}</p>
        </div>
        <div className="team-member">
          <img src="/images/teammate2.jpg" alt="Teammate 2" className="team-photo" />
          <p id="team-member-name-and-role">{t('team.ishaank.name')}</p>
          <p>{t('team.ishaank.desc')}</p>
        </div>
        <div className="team-member">
          <img src="/images/teammate3.jpg" alt="Teammate 3" className="team-photo" />
          <p id="team-member-name-and-role">{t('team.dani.name')}</p>
          <p>{t('team.dani.desc')}</p>
        </div>
        <div className="team-member">
          <img src="/images/teammate4.jpg" alt="Teammate 4" className="team-photo" />
          <p id="team-member-name-and-role">{t('team.gene.name')}</p>
          <p>{t('team.gene.desc')}</p>
        </div>
        <div className="team-member">
          <img src="/images/teammate5.jpg" alt="Teammate 5" className="team-photo" />
          <p id="team-member-name-and-role">{t('team.jonathan.name')}</p>
          <p>{t('team.jonathan.desc')}</p>
        </div>
        <div className="team-member">
          <img src="/images/teammate6.jpg" alt="Teammate 6" className="team-photo" />
          <p id="team-member-name-and-role">{t('team.andrew.name')}</p>
          <p>{t('team.andrew.desc')}</p>
        </div>
      </div>
    </div>
  );
}

export default About;