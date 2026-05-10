/**
 * Oasis Color Design System
 * Single source of truth for all colors
 * Supports seller themes via CSS variables
 */

export const colors = {
  // Primary brand colors (Teal - used throughout)
  primary: {
    50: '#E8F6F8',
    100: '#C4E7EB',
    200: '#9ED8DE',
    300: '#78C9D1',
    400: '#52BAC4',
    500: '#2CAAB7',    // Main primary
    600: '#1A8A96',
    700: '#147378',
    800: '#0E5C60',
    900: '#084448',
    main: '#046168',   // Current primary (from codebase)
  },

  // Secondary colors (Accent - Orange/Gold)
  secondary: {
    50: '#FEF8F0',
    100: '#FCEAD0',
    200: '#F9DCA1',
    300: '#F6CE72',
    400: '#F3C043',
    500: '#F0B314',   // Main secondary
    600: '#D89807',
    700: '#A86D00',
    800: '#784900',
    900: '#482800',
    main: '#FFB627',  // Gold accent
  },

  // Semantic colors
  danger: '#EF4444',
  dangerLight: '#FCA5A5',
  success: '#10B981',
  successLight: '#A7F3D0',
  warning: '#F59E0B',
  warningLight: '#FCD34D',
  info: '#3B82F6',
  infoLight: '#BFDBFE',

  // Neutral grays (universal)
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status colors
  status: {
    approved: '#10B981',
    pending: '#F59E0B',
    rejected: '#EF4444',
    archived: '#6B7280',
  },

  // CSS Variable fallbacks for seller themes
  // These will be overridden by CSS variables in themes
  seller: {
    primary: 'var(--seller-primary, #046168)',
    secondary: 'var(--seller-secondary, #FFB627)',
    accent: 'var(--seller-accent, #F59E0B)',
  },

  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  // Text colors
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#6B7280',
    light: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Border colors
  border: {
    light: '#E5E7EB',
    default: '#D1D5DB',
    dark: '#9CA3AF',
  },

  // Legacy colors (from existing codebase - to be phased out)
  legacy: {
    teal: '#046168e0',
    orange: 'rgba(170, 127, 8, 0.795)',
    lightText: '#e1e0e0',
    darkText: '#232323bd',
    border: '#b7b7b7',
    bg: '#dddddd61',
  },
};

export default colors;
