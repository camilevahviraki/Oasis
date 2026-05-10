/**
 * i18n Configuration
 * Internationalization setup for Oasis Design System
 * Supports: EN, ES, FR, AR (with RTL)
 *
 * Usage:
 * import i18n from './config/i18n';
 * // In App.js: i18n.init()
 */

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import arTranslations from './locales/ar.json';

// Language detection order
const languageDetector = new LanguageDetector();

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  ar: { translation: arTranslations },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      // Language detection order
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Disable Suspense for now
    },
  });

export default i18next;
