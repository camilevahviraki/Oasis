/**
 * Apply Theme Utility
 * Converts theme object to CSS variables
 * Handles both light theme and seller themes
 *
 * Usage:
 * applyTheme(lightTheme);
 * applyTheme(sellerTheme);
 */

export const applyTheme = (theme) => {
  if (!theme) return;

  const root = document.documentElement;

  // Apply color variables
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }

  // Apply component colors
  if (theme.components?.button?.primary) {
    root.style.setProperty('--color-button-primary', theme.components.button.primary.background);
    root.style.setProperty('--color-button-primary-hover', theme.components.button.primary.hover);
    root.style.setProperty('--color-button-primary-active', theme.components.button.primary.active);
  }

  // Apply input colors
  if (theme.components?.input) {
    root.style.setProperty('--color-input-bg', theme.components.input.background);
    root.style.setProperty('--color-input-border', theme.components.input.border);
    root.style.setProperty('--color-input-border-focus', theme.components.input.borderFocus);
  }

  // Apply spacing
  if (theme.spacing) {
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
  }

  // Apply border radius
  if (theme.borderRadius) {
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
  }

  // Apply shadows
  if (theme.shadows) {
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }

  // Apply seller branding
  if (theme.branding) {
    if (theme.branding.logoUrl) {
      root.style.setProperty('--seller-logo', `url(${theme.branding.logoUrl})`);
    }
    if (theme.branding.fontFamily) {
      root.style.setProperty('--seller-font-family', theme.branding.fontFamily);
    }
  }
};

export default applyTheme;
