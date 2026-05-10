# Component Library Setup Checklist

## 📦 Required Dependencies

Make sure these are installed in your `package.json`:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.47.0",
  "prop-types": "^15.8.1"
}
```

### Install Missing Dependencies

```bash
# If react-hook-form is not installed
npm install react-hook-form

# If prop-types is not installed
npm install prop-types
```

## 📂 Complete Directory Structure

```
src/
├── design-system/
│   ├── tokens/
│   │   ├── colors.js              ✅ Color palette
│   │   ├── spacing.js             ✅ Spacing scale
│   │   └── typography.js          ✅ Typography system
│   ├── themes/
│   │   ├── lightTheme.js          ✅ Base light theme
│   │   └── sellerThemeTemplate.js ✅ Seller theme template
│   └── utils/
│       └── applyTheme.js          ✅ Theme application utility
├── components-library/
│   ├── Button/
│   │   ├── Button.jsx             ✅ Button component
│   │   └── Button.css             ✅ Button styles
│   ├── Input/
│   │   ├── Input.jsx              ✅ Input component
│   │   └── Input.css              ✅ Input styles
│   ├── Form/
│   │   ├── Form.jsx               ✅ Form component
│   │   └── Form.css               ✅ Form styles
│   └── index.js                   ✅ Central export
├── context/
│   └── ThemeContext.js            ✅ Theme context provider
├── styles/
│   └── theme-variables.css        ✅ CSS variables
├── App.js                         (TO UPDATE)
├── index.js                       (TO UPDATE)
└── index.css                      (TO UPDATE)
```

## 🔧 Integration Steps (In Order)

### Step 1: Add CSS Variables to index.css

Open `src/index.css` and add at the very top:

```css
/* src/index.css */

@import './styles/theme-variables.css';

/* Rest of your existing CSS */
```

### Step 2: Update index.js (or App.js entry point)

Find your app entry point and wrap with ThemeProvider:

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './App'; // Your root component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
```

### Step 3: Update App.js

```javascript
// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Stripe from './stripe/stripe';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './router/MainRouter';

export default function Root() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Stripe>
            <AppRoutes />
          </Stripe>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}
```

### Step 4: Test Setup

Create a test file to verify setup works:

```javascript
// src/test-components.jsx
import React from 'react';
import { Button, Input, Form } from './components-library';

export function TestComponents() {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>Component Library Test</h1>
      
      <h2>Buttons</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <h2>Inputs</h2>
      <Input 
        label="Email" 
        type="email" 
        placeholder="test@example.com"
        style={{ marginBottom: '10px' }}
      />

      <h2>Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="username"
          label="Username"
          required
          validation={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters'
            }
          }}
        />
        <Form.Input
          name="email"
          type="email"
          label="Email"
          required
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email'
            }
          }}
        />
        <Form.Submit>Test Submit</Form.Submit>
      </Form>
    </div>
  );
}

export default TestComponents;
```

Then add to App.js temporarily:

```javascript
// In App.js - add for testing
import TestComponents from './test-components';

return (
  <TestComponents /> // Remove after testing
);
```

### Step 5: Verify Theme CSS Variables

Check browser console:

```javascript
// In browser console
const root = document.documentElement;
console.log(getComputedStyle(root).getPropertyValue('--color-primary'));
// Should output: " #046168"
```

## 🎨 Common CSS Variable Customizations

### Change Primary Color

```css
:root {
  --color-primary: #your-color;
  --color-button-primary: #your-color;
}
```

### Change Typography

```css
:root {
  --seller-font-family: "Your Font Family";
}
```

### Dark Mode

```css
[data-theme='dark'] {
  --color-text-primary: #ffffff;
  --color-bg-primary: #1a1a1a;
  --color-border: #333333;
}
```

## ✅ Verification Checklist

- [ ] `src/design-system/` directory exists with all token files
- [ ] `src/components-library/` directory exists with Button, Input, Form
- [ ] `src/context/ThemeContext.js` exists
- [ ] `src/styles/theme-variables.css` exists
- [ ] App.js wrapped with `<ThemeProvider>`
- [ ] `@import './styles/theme-variables.css';` in index.css
- [ ] No console errors on app startup
- [ ] Button component renders with correct styles
- [ ] Input component renders with correct styles
- [ ] Form component renders and validates input
- [ ] CSS variables visible in browser DevTools

## 🚨 Common Issues & Fixes

### Issue: Buttons don't have colors
**Fix:** Make sure `theme-variables.css` is imported in index.css FIRST

### Issue: Form validation not working
**Fix:** Ensure `react-hook-form` is installed: `npm install react-hook-form`

### Issue: PropTypes warnings in console
**Fix:** Ensure `prop-types` is installed: `npm install prop-types`

### Issue: Theme doesn't apply to seller pages
**Fix:** Use `useTheme()` hook to apply seller theme:
```javascript
const { applySellerTheme } = useTheme();
// Then apply theme when entering seller page
```

## 🔗 Dependencies Installation Command

```bash
npm install react-hook-form prop-types --save
```

## 📝 File Dependencies Map

```
index.js/App.js
  └─→ ThemeProvider (from src/context/ThemeContext.js)
       └─→ applyTheme (from src/design-system/utils/applyTheme.js)
            └─→ lightTheme (from src/design-system/themes/lightTheme.js)
                 └─→ colors, spacing, etc.

Components:
  Button.jsx → Button.css → theme-variables.css
  Input.jsx → Input.css → theme-variables.css
  Form.jsx → Form.css + Button.jsx + Input.jsx
```

---

**Status:** Setup documentation complete ✅
**Next:** Start migrating pages to new components
