/**
 * Language Context
 * Provides language switching and RTL support
 *
 * Usage:
 * const { language, setLanguage, isRTL } = useLanguage();
 */

import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // Determine if current language is RTL
  const isRTL = ['ar', 'he', 'fa', 'ur'].includes(i18n.language);

  // Apply RTL direction to document
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  const changeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language: i18n.language,
    setLanguage: changeLanguage,
    isRTL,
    t: i18n.t, // Expose translation function
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;
