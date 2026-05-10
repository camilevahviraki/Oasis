# Seller Theme Customization Guide

## Overview

Each seller can have their own custom branding without code changes. Colors, fonts, and styling are controlled through theme configuration.

---

## 🎨 How Seller Themes Work

### Behind the Scenes

1. **Seller creates a theme** - Defines colors, fonts, branding
2. **App applies theme** - Converts to CSS variables
3. **All components update** - Buttons, inputs, cards automatically change colors

**Example:**
```javascript
// Seller "Modern Electronics" wants red buttons instead of teal
const theme = { colors: { primary: '#FF6B6B' } };
applySellerTheme(theme);
// ✅ All buttons now RED automatically
```

---

## 📋 Creating a Seller Theme

### Minimal Theme (Just Colors)

```javascript
import { sellerThemeTemplate } from '@/design-system/themes/sellerThemeTemplate';

const basicTheme = {
  ...sellerThemeTemplate,
  name: 'seller-basic',
  colors: {
    primary: '#FF6B6B',      // Change button color
    secondary: '#4ECDC4',    // Change accent color
  },
};
```

### Full Theme (With Branding)

```javascript
const fullTheme = {
  ...sellerThemeTemplate,
  
  name: 'electronics-store',
  
  // Store branding
  branding: {
    logoUrl: 'https://cdn.example.com/logo.png',
    logoAlt: 'Electronics Store',
    favicon: 'https://cdn.example.com/favicon.ico',
    fontFamily: 'Poppins, sans-serif',
  },

  // Custom colors
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    success: '#52B788',
    danger: '#EF4444',
  },

  // Component-specific styling
  components: {
    button: {
      primary: {
        background: '#FF6B6B',
        hover: '#FF5252',
        active: '#E63946',
      },
    },
    card: {
      borderRadius: '16px',
      shadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
  },
};
```

---

## 🎯 Using Seller Themes in App

### Apply Seller Theme on Load

```javascript
import { useTheme } from '@/context/ThemeContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SellerStorePage() {
  const { sellerId } = useParams();
  const { applySellerTheme, clearSellerTheme } = useTheme();

  useEffect(() => {
    // Fetch seller's theme from API
    fetch(`/api/sellers/${sellerId}/theme`)
      .then(res => res.json())
      .then(theme => {
        // Apply seller's custom theme
        applySellerTheme(theme);
      });

    // Clean up when leaving page
    return () => clearSellerTheme();
  }, [sellerId, applySellerTheme, clearSellerTheme]);

  return (
    <div>
      {/* All components will use seller's theme colors */}
      <h1>Seller Store</h1>
    </div>
  );
}
```

### Theme Scope

Themes apply to everything inside the component:
```javascript
// Outside store page: Light theme (default)
<Button>Default Teal</Button>

// Inside seller store page: Seller's theme
<SellerStorePage /> {/* All buttons are seller's color */}

// Back outside: Light theme again
<Button>Back to Teal</Button>
```

---

## 🌈 Common Seller Theme Examples

### Fast Food Restaurant
```javascript
const fastFoodTheme = {
  name: 'fast-food',
  colors: {
    primary: '#E31937',      // Bright red
    secondary: '#FFC72C',    // Gold
    success: '#52B788',
  },
  branding: {
    logoUrl: 'https://cdn.example.com/fastfood-logo.png',
    fontFamily: 'Arial, sans-serif',
  },
};
```

### Tech Store
```javascript
const techTheme = {
  name: 'tech-store',
  colors: {
    primary: '#0066FF',      // Electric blue
    secondary: '#00D9FF',    // Cyan
    success: '#00FF00',
  },
  branding: {
    logoUrl: 'https://cdn.example.com/tech-logo.png',
    fontFamily: 'Roboto, sans-serif',
  },
};
```

### Fashion Boutique
```javascript
const fashionTheme = {
  name: 'fashion-boutique',
  colors: {
    primary: '#8B008B',      // Dark magenta
    secondary: '#FFB6C1',    // Light pink
    success: '#FF69B4',      // Hot pink
  },
  branding: {
    logoUrl: 'https://cdn.example.com/fashion-logo.png',
    fontFamily: 'Georgia, serif',
  },
};
```

---

## 🛠️ API: Theme Configuration

### Color Options

All available color customizations:

```javascript
const theme = {
  colors: {
    // Brand colors
    primary: '#046168',                 // Main color
    secondary: '#FFB627',               // Accent color
    
    // Status colors
    danger: '#EF4444',                  // Errors, delete
    success: '#10B981',                 // Success states
    warning: '#F59E0B',                 // Warnings
    info: '#3B82F6',                    // Info states
    
    // Text colors
    text: '#111827',                    // Main text
    textSecondary: '#6b7280',           // Secondary text
    textTertiary: '#9ca3af',            // Tertiary text
    
    // Backgrounds
    background: '#ffffff',              // Main background
    surface: '#f9fafb',                 // Surface background
    
    // Borders
    border: '#d1d5db',                  // Default border
  }
};
```

### Component-Specific Overrides

```javascript
const theme = {
  components: {
    button: {
      primary: {
        background: '#FF6B6B',
        text: '#ffffff',
        hover: '#FF5252',
        active: '#E63946',
        disabled: '#d1d5db',
      },
      secondary: {
        background: '#FFB627',
        text: '#111827',
        hover: '#FFC555',
        active: '#FFA500',
      },
    },
    input: {
      background: '#ffffff',
      border: '#d1d5db',
      borderFocus: '#FF6B6B',           // Use primary color
      text: '#111827',
    },
    card: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
  }
};
```

### Branding Options

```javascript
const theme = {
  branding: {
    logoUrl: 'https://...',             // Seller's logo
    logoAlt: 'Store Name',              // Alt text
    favicon: 'https://...',             // Browser tab icon
    fontFamily: 'Poppins, sans-serif',  // Custom font
  }
};
```

---

## 💾 Saving Seller Themes (Backend)

### Database Schema

```sql
CREATE TABLE seller_themes (
  id INT PRIMARY KEY,
  seller_id INT NOT NULL,
  name VARCHAR(100),
  colors JSON,              -- Stores color customizations
  branding JSON,            -- Stores logo, font, etc.
  components JSON,          -- Component-specific overrides
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### API Example

```javascript
// Save seller theme
async function saveSellerTheme(sellerId, theme) {
  const response = await fetch(`/api/sellers/${sellerId}/theme`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: theme.name,
      colors: theme.colors,
      branding: theme.branding,
      components: theme.components,
    }),
  });
  return response.json();
}

// Fetch seller theme
async function getSellerTheme(sellerId) {
  const response = await fetch(`/api/sellers/${sellerId}/theme`);
  return response.json();
}
```

---

## 🎨 Theme Customization UI (Future)

Example seller dashboard for customizing themes:

```javascript
function SellerThemeCustomizer() {
  const [theme, setTheme] = useState(defaultTheme);

  const handlePrimaryColorChange = (color) => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        primary: color,
      },
    };
    setTheme(newTheme);
    applySellerTheme(newTheme);
    saveSellerTheme(sellerId, newTheme);
  };

  return (
    <div className="theme-customizer">
      <h2>Customize Your Store Theme</h2>
      
      <div>
        <label>Primary Color</label>
        <input
          type="color"
          value={theme.colors.primary}
          onChange={(e) => handlePrimaryColorChange(e.target.value)}
        />
      </div>

      <div>
        <label>Secondary Color</label>
        <input
          type="color"
          value={theme.colors.secondary}
          onChange={(e) => setTheme({
            ...theme,
            colors: { ...theme.colors, secondary: e.target.value }
          })}
        />
      </div>

      <div>
        <label>Logo</label>
        <input type="file" accept="image/*" />
      </div>

      <button onClick={() => saveSellerTheme(sellerId, theme)}>
        Save Theme
      </button>

      {/* Live preview */}
      <div className="preview">
        <Button variant="primary">Preview Button</Button>
        <Input label="Preview Input" />
      </div>
    </div>
  );
}
```

---

## 🔄 CSS Variables Automatically Updated

When seller theme is applied, all CSS variables update:

```css
/* Before seller theme */
:root {
  --color-primary: #046168;           /* Teal */
  --color-button-primary: #046168;
}

/* After seller theme with primary: '#FF6B6B' */
:root {
  --color-primary: #FF6B6B;           /* Red */
  --color-button-primary: #FF6B6B;
}

/* All components using var(--color-primary) automatically update! */
```

---

## 🧪 Testing Seller Themes

Create a theme switcher for testing:

```javascript
import { useTheme } from '@/context/ThemeContext';
import { fastFoodTheme, techTheme, fashionTheme } from '@/themes/examples';

function ThemeSwitcher() {
  const { applySellerTheme, clearSellerTheme } = useTheme();

  return (
    <div style={{ padding: '20px', gap: '10px', display: 'flex' }}>
      <button onClick={() => clearSellerTheme()}>
        Default Theme
      </button>
      <button onClick={() => applySellerTheme(fastFoodTheme)}>
        Fast Food
      </button>
      <button onClick={() => applySellerTheme(techTheme)}>
        Tech Store
      </button>
      <button onClick={() => applySellerTheme(fashionTheme)}>
        Fashion
      </button>
    </div>
  );
}
```

---

## ⚡ Performance Notes

- Themes apply instantly via CSS variables
- No page reload required
- All components re-render with new colors
- Supports unlimited seller themes

---

## 📝 Seller Theme Schema Summary

```javascript
{
  name: string,                    // Unique theme name
  branding: {
    logoUrl: string,
    logoAlt: string,
    favicon: string,
    fontFamily: string,
  },
  colors: {
    primary: string (hex),
    secondary: string (hex),
    danger: string (hex),
    success: string (hex),
    warning: string (hex),
    info: string (hex),
    text: string (hex),
    background: string (hex),
    border: string (hex),
  },
  components: {
    button: { primary: {}, secondary: {} },
    input: {},
    card: {},
  },
  seller: {
    id: number,
    name: string,
  }
}
```

---

## 🎯 Next Steps

1. Create seller theme data structures in backend
2. Build seller dashboard for theme customization
3. API endpoints for saving/loading themes
4. Testing with multiple sellers
5. Performance optimization

---

**Result:** Each seller gets custom branding without code changes! ✨
