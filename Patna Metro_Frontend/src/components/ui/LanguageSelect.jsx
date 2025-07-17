import React from 'react';
import { useLanguage } from '../services/utils/LanguageContext';

export const LanguageSelect = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      aria-label={t('toggleLanguage')}
    >
      <span className="mr-2">{language === 'en' ? 'हिंदी' : 'English'}</span>
      <span>🌐</span>
    </button>
  );
};