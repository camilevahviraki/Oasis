/**
 * Theme Context
 * Manages theme switching and seller themes globally
 * Supports: light theme, dark theme, seller themes
 *
 * Usage:
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * Inside component:
 * const { theme, setTheme } = useTheme();
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme } from '../themes/lightTheme';
import { applyTheme } from '../utils/applyTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children, initialTheme = 'light' }) => {
  const [theme, setTheme] = useState(initialTheme);
  const [sellerTheme, setSellerTheme] = useState(null);

  // Apply theme when it changes
  useEffect(() => {
    const themeToApply = sellerTheme || lightTheme;
    applyTheme(themeToApply);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, sellerTheme]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const applySellerTheme = (theme) => {
    setSellerTheme(theme);
  };

  const clearSellerTheme = () => {
    setSellerTheme(null);
  };

  const value = {
    theme,
    setTheme: updateTheme,
    sellerTheme,
    applySellerTheme,
    clearSellerTheme,
    currentTheme: sellerTheme || lightTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
