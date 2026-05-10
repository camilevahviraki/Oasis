/**
 * Spacing Scale
 * Used for margins, padding, gaps, etc.
 * All values in pixels
 */

export const spacing = {
  // Base scale (4px baseline)
  xs: '4px',      // Extra small
  sm: '8px',      // Small
  md: '16px',     // Medium (default)
  lg: '24px',     // Large
  xl: '32px',     // Extra large
  xxl: '48px',    // 2X Large
  xxxl: '64px',   // 3X Large

  // Numeric scale for flexibility
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',

  // Common patterns
  gutter: '16px',        // Grid gutter
  section: '48px',       // Section spacing
  component: '8px',      // Component internal spacing
};

export const borderRadius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const transitions = {
  fast: '150ms ease-in-out',
  default: '200ms ease-in-out',
  slow: '300ms ease-in-out',
};

export default {
  spacing,
  borderRadius,
  shadows,
  transitions,
};
