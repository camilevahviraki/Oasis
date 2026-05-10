# Quick Start Guide: Getting Design System Live

## ⏱️ Time Required: 15 minutes

This guide gets the design system working in your app RIGHT NOW.

---

## Step 1: Install Dependencies (2 minutes)

```bash
cd Oasis
npm install react-hook-form prop-types
```

Verify installation:
```bash
npm list react-hook-form prop-types
```

---

## Step 2: Update Your App.js (3 minutes)

**Find your current App.js entry point** and wrap everything with `ThemeProvider`:

### Current App.js
```javascript
// Your current setup
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Stripe from './stripe/stripe';

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Stripe>
          {/* Your app */}
        </Stripe>
      </BrowserRouter>
    </Provider>
  );
}
```

### Updated App.js
```javascript
// ADD THESE IMPORTS AT TOP
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Stripe from './stripe/stripe';
import { ThemeProvider } from './context/ThemeContext'; // NEW LINE
import './styles/theme-variables.css'; // NEW LINE

export default function Root() {
  return (
    <ThemeProvider> {/* WRAP WITH THIS */}
      <Provider store={store}>
        <BrowserRouter>
          <Stripe>
            {/* Your app */}
          </Stripe>
        </BrowserRouter>
      </Provider>
    </ThemeProvider> {/* CLOSES HERE */}
  );
}
```

**Changes Required:**
- Add `import { ThemeProvider } from './context/ThemeContext';`
- Add `import './styles/theme-variables.css';`
- Wrap entire return with `<ThemeProvider>...</ThemeProvider>`

---

## Step 3: Update Your index.css (2 minutes)

**Find your src/index.css** and add this at the VERY TOP:

```css
/* src/index.css */

/* IMPORT FIRST - BEFORE EVERYTHING ELSE */
@import './styles/theme-variables.css';

/* Then all your existing CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--seller-font-family, 'Open Sans', 'Oxygen', system-ui);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
}

/* ... rest of your CSS ... */
```

---

## Step 4: Test Components Are Working (5 minutes)

Add this component temporarily to test:

```javascript
// src/test-setup.jsx
import React from 'react';
import { Button, Input, Form } from './components-library';

export function TestSetup() {
  const handleSubmit = (data) => {
    console.log('✅ Form works! Data:', data);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>✅ Design System Test</h1>

      <h2 style={{ marginTop: '30px' }}>Buttons</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>

      <h2 style={{ marginTop: '30px' }}>Inputs</h2>
      <Input label="Test Email" type="email" placeholder="test@example.com" />
      <Input label="Test Password" type="password" placeholder="••••••••" />

      <h2 style={{ marginTop: '30px' }}>Form</h2>
      <Form onSubmit={handleSubmit}>
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
        <Form.Input
          name="name"
          label="Name"
          required
          validation={{
            required: 'Name is required'
          }}
        />
        <Form.Submit>Test Submit</Form.Submit>
      </Form>
    </div>
  );
}
```

Then add to your App (temporarily):

```javascript
// In your App.js, show the test component
import { TestSetup } from './test-setup';

// Inside your return, add:
<TestSetup />
```

Start your app:
```bash
npm start
```

**Expected Results:**
- ✅ Buttons appear with teal background
- ✅ Inputs appear with borders
- ✅ Form submits and logs data
- ✅ No console errors
- ✅ Styling looks consistent

After testing, **remove** the TestSetup import and component.

---

## Step 5: Verify CSS Variables (2 minutes)

Open browser console and run:

```javascript
// Check if CSS variables are loaded
const root = document.documentElement;
console.log('Primary color:', getComputedStyle(root).getPropertyValue('--color-primary'));
console.log('Should print: #046168');

// Check all variables
const vars = getComputedStyle(root);
console.log('All CSS variables loaded:', vars);
```

Expected output:
```
Primary color:  #046168
```

---

## 🎉 Success Checklist

- ✅ Dependencies installed (react-hook-form, prop-types)
- ✅ App.js has ThemeProvider wrapper
- ✅ index.css imports theme-variables.css
- ✅ Test component renders without errors
- ✅ Buttons have teal styling
- ✅ Inputs have proper styling
- ✅ Form validates and submits
- ✅ CSS variables visible in console

---

## 🚨 Troubleshooting

### Issue: "Cannot find module './context/ThemeContext'"
**Fix:** Make sure file exists at: `src/context/ThemeContext.js`

### Issue: Buttons have no color
**Fix:** Check that `theme-variables.css` is imported in `index.css` FIRST

### Issue: React errors about PropTypes
**Fix:** Install prop-types: `npm install prop-types`

### Issue: Form validation not working
**Fix:** Install react-hook-form: `npm install react-hook-form`

### Issue: "useTheme must be used within ThemeProvider"
**Fix:** Make sure `<ThemeProvider>` wraps entire app in App.js

---

## 📁 File Checklist

These files MUST exist:

```
✅ src/design-system/tokens/colors.js
✅ src/design-system/tokens/spacing.js
✅ src/design-system/tokens/typography.js
✅ src/design-system/themes/lightTheme.js
✅ src/design-system/themes/sellerThemeTemplate.js
✅ src/design-system/utils/applyTheme.js
✅ src/components-library/Button/Button.jsx
✅ src/components-library/Button/Button.css
✅ src/components-library/Input/Input.jsx
✅ src/components-library/Input/Input.css
✅ src/components-library/Form/Form.jsx
✅ src/components-library/Form/Form.css
✅ src/components-library/index.js
✅ src/context/ThemeContext.js
✅ src/styles/theme-variables.css
```

If any are missing, check file creation status or request file creation.

---

## ✨ Next Steps

Once this is working:

1. **Migrate one page** - Start with signin.js
2. **Replace old buttons** - Use `<Button>` instead of CSS classes
3. **Replace old inputs** - Use `<Input>` instead of `<input>`
4. **Test seller themes** - Try applying a custom theme
5. **Expand to other pages** - Gradually migrate entire app

---

## 📚 Documentation

- Full Integration Guide: `DESIGN_SYSTEM_INTEGRATION_GUIDE.md`
- Setup Checklist: `COMPONENT_SETUP_CHECKLIST.md`
- Phase 1 Summary: `PHASE_1_IMPLEMENTATION_SUMMARY.md`

---

## ⏭️ After This Works

See `DESIGN_SYSTEM_INTEGRATION_GUIDE.md` section "Step 4: Migrate Authentication Pages" to start replacing pages.

---

**Expected Completion Time: 15-20 minutes**

After this, you'll have a working design system ready for page migration!
