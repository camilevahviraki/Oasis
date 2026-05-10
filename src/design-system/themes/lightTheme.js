/**
 * Light Theme - Default Oasis Theme
 * Used as base for all components
 * Seller themes extend this
 */

import colors from '../tokens/colors';
import { spacing, borderRadius, shadows } from '../tokens/spacing';

export const lightTheme = {
  name: 'light',
  mode: 'light',

  // Colors
  colors: {
    primary: colors.primary.main,
    secondary: colors.secondary.main,
    danger: colors.danger,
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
    background: colors.background.primary,
    surface: colors.background.secondary,
    text: colors.text.primary,
    textSecondary: colors.text.secondary,
    border: colors.border.default,
  },

  // Spacing
  spacing,

  // Border radius
  borderRadius,

  // Shadows
  shadows,

  // Component-specific overrides
  components: {
    button: {
      primary: {
        background: colors.primary.main,
        text: '#FFFFFF',
        hover: colors.primary[700],
        active: colors.primary[800],
        disabled: colors.neutral[300],
      },
      secondary: {
        background: colors.neutral[200],
        text: colors.text.primary,
        hover: colors.neutral[300],
        active: colors.neutral[400],
        disabled: colors.neutral[200],
      },
      danger: {
        background: colors.danger,
        text: '#FFFFFF',
        hover: '#DC2626',
        active: '#991B1B',
        disabled: colors.neutral[300],
      },
      success: {
        background: colors.success,
        text: '#FFFFFF',
        hover: '#059669',
        active: '#047857',
        disabled: colors.neutral[300],
      },
    },

    input: {
      background: '#FFFFFF',
      border: colors.border.light,
      borderFocus: colors.primary.main,
      text: colors.text.primary,
      placeholder: colors.text.tertiary,
      disabled: colors.background.secondary,
    },

    card: {
      background: '#FFFFFF',
      border: colors.border.light,
      shadow: shadows.md,
    },

    modal: {
      background: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
      shadow: shadows.xl,
    },

    badge: {
      primary: {
        background: colors.primary[50],
        text: colors.primary.main,
      },
      success: {
        background: colors.successLight,
        text: colors.success,
      },
      danger: {
        background: colors.dangerLight,
        text: colors.danger,
      },
      warning: {
        background: colors.warningLight,
        text: colors.warning,
      },
    },
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
};

export default lightTheme;
