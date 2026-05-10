# Design System & Component Library Integration Guide

## 📋 Quick Overview

This guide explains how to integrate the new design system and component library into the Oasis app. We've created a unified system to replace scattered styling, multiple form implementations, and inconsistent components.

## ✅ What's Been Created

### Phase 1: Foundation (COMPLETE)
- ✅ Design System Tokens (colors, spacing, typography)
- ✅ Light Theme (base theme for all components)
- ✅ Seller Theme Template (for seller-specific branding)
- ✅ Button Component Library (primary, secondary, danger, success)
- ✅ Input Component Library (text, email, password, etc.)
- ✅ Form Component (react-hook-form integration)
- ✅ Theme Context (for dynamic theme switching)

### Phase 2: Integration (YOU ARE HERE)
- 📍 Update App.js with ThemeProvider
- 📍 Update index.css with CSS variables
- 📍 Migrate authentication pages to new components
- 📍 Migrate admin pages to new components
- 📍 Migrate seller pages to new components

## 🚀 Step 1: Setup App.js with ThemeProvider

### Current App.js Structure
```javascript
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Stripe from './stripe/stripe';
```

### Updated App.js
```javascript
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Stripe from './stripe/stripe';
import { ThemeProvider } from './context/ThemeContext';
import './styles/theme-variables.css'; // NEW: Add theme variables

export default function Root() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Stripe>
            <App />
          </Stripe>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}
```

**Key Changes:**
- Import `ThemeProvider` from `./context/ThemeContext`
- Import theme variables CSS: `./styles/theme-variables.css`
- Wrap entire app with `<ThemeProvider>`

## 🎨 Step 2: Update index.css with Theme Variables

Add the theme variables CSS file to your main index.css:

```css
/* index.css */

/* Import theme variables FIRST */
@import './styles/theme-variables.css';

/* Then your existing global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--seller-font-family, 'Open Sans', 'Oxygen', system-ui, -apple-system, sans-serif);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  transition: background-color var(--transition-default);
}

/* Remove your old color definitions and replace with CSS variables */
```

## 📦 Step 3: Update Component Library Index

Update `src/components-library/index.js`:

```javascript
export { Button, default as ButtonComponent } from './Button/Button';
export { Input, default as InputComponent } from './Input/Input';
export { Form, FormInput, FormSelect, FormSubmit } from './Form/Form';
// Add more as created:
// export { Modal } from './Modal/Modal';
// export { Card } from './Card/Card';
// export { Badge } from './Badge/Badge';
```

## 🔄 Step 4: Migrate Authentication Pages

### Before: signin.js (OLD - scattered styling)
```javascript
// Old approach: Manual form handling, hard-coded styles
import './authentication.css';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manual validation
    if (!formData.email) setErrors({ ...errors, email: 'Email required' });
    // ... more validation
  };

  return (
    <div className="auth-container">
      <form className="user-authentication-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="user-authentication-form-input"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <button className="user-authentication-form-button" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
```

### After: signin.js (NEW - unified components)
```javascript
// New approach: react-hook-form + design system components
import { Form } from '@/components-library';
import { useSignIn } from '@/redux/authentication/authSlice'; // Redux slice (to be created)

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      // Handle response
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Sign In</h1>
        
        <Form onSubmit={handleSubmit} layout="vertical">
          <Form.Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
            validation={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
          />

          <Form.Input
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
            validation={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
          />

          <Form.Submit>Sign In</Form.Submit>
        </Form>

        <p>
          Don't have an account?{' '}
          <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
```

**Benefits:**
- ✅ Automatic validation with error display
- ✅ Loading state handled automatically
- ✅ Consistent styling via design system
- ✅ No manual form state management
- ✅ Accessibility features built-in

## 🎯 Step 5: Migrate Existing Components

### Replace Old Buttons

**Before:**
```html
<!-- From authentication.css -->
<button class="user-authentication-form-button">Login</button>
```

**After:**
```jsx
import { Button } from '@/components-library';

<Button variant="primary" size="md">Login</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
```

### Replace Old Inputs

**Before:**
```html
<!-- From authentication.css -->
<input type="email" class="user-authentication-form-input" />
```

**After:**
```jsx
import { Input } from '@/components-library';

<Input 
  type="email" 
  label="Email" 
  placeholder="you@example.com"
  error={errors.email}
  hint="We'll never share your email"
/>
```

## 🛍️ Step 6: Seller Theme Implementation

### Using Seller Theme

```javascript
import { useTheme } from '@/context/ThemeContext';
import { exampleSellerTheme } from '@/design-system/themes/sellerThemeTemplate';

function SellerDashboard() {
  const { applySellerTheme, clearSellerTheme } = useTheme();
  
  useEffect(() => {
    // Apply seller's theme
    const sellerTheme = {
      ...exampleSellerTheme,
      seller: {
        id: sellerId,
        name: sellerName,
      },
    };
    applySellerTheme(sellerTheme);
    
    // Clean up when leaving
    return () => clearSellerTheme();
  }, [sellerId]);

  return (
    <div className="seller-store">
      {/* All buttons, inputs will now use seller's theme colors */}
      <Button variant="primary">Shop Now</Button>
    </div>
  );
}
```

### Creating Custom Seller Theme

```javascript
const customSellerTheme = {
  name: 'electronics-store',
  branding: {
    logoUrl: 'https://cdn.example.com/stores/logo.png',
    logoAlt: 'My Store',
    favicon: 'https://cdn.example.com/stores/favicon.ico',
    fontFamily: 'Poppins',
  },
  colors: {
    primary: '#FF6B6B',      // Custom primary color
    secondary: '#4ECDC4',    // Custom secondary color
    success: '#52B788',
  },
  components: {
    button: {
      primary: {
        background: '#FF6B6B',
        hover: '#FF5252',
        active: '#E63946',
      },
    },
  },
};
```

## 🔧 Step 7: CSS Variable Reference

All components use CSS variables. Customize them globally:

```css
:root {
  /* Override defaults */
  --color-primary: #1a5f7a;
  --color-secondary: #e8a32c;
  --color-success: #2ecc71;
  --color-danger: #e74c3c;
  --color-warning: #f39c12;
  --color-info: #3498db;
}
```

## 📊 Migration Checklist

- [ ] Update App.js with ThemeProvider
- [ ] Import theme-variables.css in index.css
- [ ] Update components-library index.js with Form exports
- [ ] Migrate signin.js to new Form component
- [ ] Migrate signup.js to new Form component
- [ ] Migrate updateAccount.js to new Form component
- [ ] Migrate all admin pages to new Button/Input components
- [ ] Migrate all seller pages to new Button/Input components
- [ ] Migrate user account pages to new Button/Input components
- [ ] Update createItem.js form to use Form component
- [ ] Remove old CSS files:
  - [ ] authentication.css
  - [ ] user_account.css
  - [ ] Header.css (partial)
  - [ ] menu.css (partial)
  - [ ] Update AdminHeader.css (replace with new components)

## 🧪 Testing New Components

```javascript
// Test Button variants
import { Button } from '@/components-library';

export function ButtonShowcase() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="outline">Outline</Button>
      
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      
      <Button loading>Loading...</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
```

```javascript
// Test Input variants
import { Input } from '@/components-library';

export function InputShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Input label="Text Input" type="text" placeholder="Enter text" />
      <Input label="Email Input" type="email" placeholder="Enter email" />
      <Input label="Password Input" type="password" placeholder="Enter password" />
      <Input label="With Error" error="This field is required" />
      <Input label="With Hint" hint="This is helpful text" />
      <Input label="Disabled" disabled value="Cannot edit" />
    </div>
  );
}
```

## 📚 Next Steps

1. **Week 2:** Migrate all pages to new components (estimated 3-4 days)
2. **Week 3:** Redux Toolkit migration (40+ reducers → feature slices)
3. **Week 4:** Additional components (Modal, Card, Badge, Breadcrumb, Tabs)
4. **Week 5:** Seller theme customization UI
5. **Week 6:** Storybook documentation

## 🤝 Questions?

Refer to these files for more details:
- Design System: `src/design-system/`
- Components: `src/components-library/`
- Theme Context: `src/context/ThemeContext.js`
- Theme Utilities: `src/design-system/utils/applyTheme.js`

---

**Status:** Phase 1 (Foundation) ✅ Complete
**Next Phase:** Phase 2 (Integration) - Start with App.js setup
