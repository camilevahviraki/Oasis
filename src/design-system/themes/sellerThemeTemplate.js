/**
 * Seller Theme Template
 * Each seller can create a custom theme based on this template
 * Use this to create seller-specific branding
 *
 * Example usage:
 * const myStoreTheme = {
 *   ...sellerThemeTemplate,
 *   name: 'mystore',
 *   colors: {
 *     ...sellerThemeTemplate.colors,
 *     primary: '#FF6B6B',
 *     secondary: '#4ECDC4',
 *   }
 * };
 */

import { lightTheme } from './lightTheme';
import colors from '../tokens/colors';

export const sellerThemeTemplate = {
  ...lightTheme,
  
  name: 'seller-custom',
  type: 'seller',
  
  // Seller branding
  branding: {
    logoUrl: null,           // URL to seller logo
    logoAlt: 'Store Logo',
    favicon: null,           // URL to favicon
    fontFamily: 'Open Sans', // Custom font family
  },

  // Customizable colors (CSS variables will override these)
  colors: {
    ...lightTheme.colors,
    // Override primary color for seller branding
    // primary: '#YOUR_COLOR',
    // secondary: '#YOUR_COLOR',
  },

  // Component customizations per seller
  components: {
    ...lightTheme.components,
    
    button: {
      ...lightTheme.components.button,
      // Sellers can override button styles
      // primary: { ... },
    },

    card: {
      ...lightTheme.components.card,
      // Custom card border radius for seller
      // borderRadius: '16px',
    },
  },

  // Seller-specific settings
  seller: {
    id: null,              // Seller ID
    name: null,            // Seller name
    theme: null,           // Theme ID
    createdAt: null,
    updatedAt: null,
  },
};

/**
 * Example seller theme:
 */
export const exampleSellerTheme = {
  ...sellerThemeTemplate,
  name: 'modern-electronics',
  branding: {
    logoUrl: 'https://cdn.example.com/stores/electronics-logo.png',
    logoAlt: 'Modern Electronics',
    favicon: 'https://cdn.example.com/stores/electronics-favicon.ico',
    fontFamily: 'Poppins',
  },
  colors: {
    ...lightTheme.colors,
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    success: '#52B788',
  },
  components: {
    ...lightTheme.components,
    button: {
      ...lightTheme.components.button,
      primary: {
        background: '#FF6B6B',
        text: '#FFFFFF',
        hover: '#FF5252',
        active: '#E63946',
      },
    },
    card: {
      ...lightTheme.components.card,
      borderRadius: '16px',
      shadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
  },
  seller: {
    id: 'seller_001',
    name: 'Modern Electronics',
    theme: 'electronics_v1',
  },
};

export default sellerThemeTemplate;
