import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SignOut() {
  const navigate = useNavigate();
  const { t } = useTranslation('settings');

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL_BACKEND_PORT}/api/signout`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Logout failed');

        navigate('/signin');
      } catch (err) {
        console.error('❌ Error signing out:', err);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="text-center mt-10 text-gray-700">
      {t('signingOut')}
    </div>
  );
}
