/**
 * Typography System
 * Defines all font sizes, weights, and line heights
 * Used for consistency across components
 */

export const typography = {
  // Headings
  h1: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '1.3',
    letterSpacing: '-0.25px',
  },
  h3: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '1.4',
  },
  h4: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '1.4',
  },
  h5: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '1.5',
  },
  h6: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '1.5',
  },

  // Body text
  body: {
    lg: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '1.6',
    },
    md: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
    },
    sm: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '1.5',
    },
    xs: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4',
    },
  },

  // Font weights
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Font families
  fonts: {
    sans: '"Open Sans", "Oxygen", system-ui, -apple-system, sans-serif',
    serif: 'Georgia, serif',
    mono: '"Courier New", monospace',
    title: '"Yatra One", cursive',
  },

  // Common combinations
  button: {
    md: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '1.5',
    },
    sm: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '1.5',
    },
    lg: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '1.5',
    },
  },

  label: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.5',
  },

  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '1.4',
    color: 'var(--text-tertiary)',
  },

  code: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '1.5',
    fontFamily: '"Courier New", monospace',
  },
};

export default typography;
