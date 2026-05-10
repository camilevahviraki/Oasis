/**
 * Language Switcher Component - Dropdown Menu
 * Fully functional language switching with i18n
 *
 * Usage:
 * import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
 * <LanguageSwitcher />
 */

import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check if language is RTL and update document
  useEffect(() => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    const rtl = rtlLanguages.includes(i18n.language);
    setIsRTL(rtl);
    
    // Apply RTL to document
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    localStorage.setItem('language', i18n.language);
  }, [i18n.language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLang = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className="language-switcher-wrapper" ref={dropdownRef}>
      <button
        className="lang-dropdown-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language selector"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="lang-flag">{currentLang?.flag}</span>
        <span className="lang-code">{currentLang?.code.toUpperCase()}</span>
        <span className="lang-chevron">▼</span>
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${i18n.language === lang.code ? 'lang-option--active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              title={lang.label}
              type="button"
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-option-label">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
