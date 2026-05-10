# i18n (Internationalization) Integration Guide

## Overview

Your Oasis design system now supports multiple languages with automatic RTL (right-to-left) support for Arabic, Hebrew, Farsi, and Urdu.

**Supported Languages:**
- 🇺🇸 English (en)
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇸🇦 Arabic (ar) - RTL

---

## 📦 Step 1: Install Dependencies

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

**What each package does:**
- `i18next` - Core internationalization framework
- `react-i18next` - React integration for i18next
- `i18next-browser-languagedetector` - Auto-detect user's language

---

## 🔧 Step 2: Setup App.js

Update your App.js entry point:

```javascript
// src/App.js (or index.js)
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Stripe from './stripe/stripe';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import i18n from './config/i18n'; // NEW: Import i18n config
import './styles/theme-variables.css';
import './styles/rtl.css'; // NEW: RTL support

// Initialize i18n
i18n.init();

export default function Root() {
  return (
    <LanguageProvider> {/* NEW: Wrap with LanguageProvider */}
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Stripe>
              <AppRoutes />
            </Stripe>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
```

**Key additions:**
- Import LanguageProvider
- Import RTL CSS
- Initialize i18n
- Wrap app with LanguageProvider

---

## 🌐 Step 3: Use Translation Keys in Components

### Option 1: Using Translation Keys (Recommended)

```jsx
import { Button, Input } from '@/components-library';

export function LoginPage() {
  return (
    <>
      <Input 
        labelI18n="inputs.email" 
        type="email" 
        placeholderI18n="inputs.email"
      />
      <Input 
        labelI18n="inputs.password" 
        type="password" 
      />
      <Button 
        variant="primary" 
        i18nKey="buttons.login"
      />
    </>
  );
}
```

### Option 2: Using useTranslation Hook

```jsx
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/components-library';

export function SignupPage() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('common.loading')}</h1>
      <Input label={t('inputs.username')} />
      <Button>{t('buttons.signup')}</Button>
    </>
  );
}
```

### Option 3: Manual Translation

```jsx
import { useLanguage } from '@/context/LanguageContext';

export function CustomComponent() {
  const { t, language, isRTL } = useLanguage();

  return (
    <>
      <p>{t('common.loading')}</p>
      <p>Current language: {language}</p>
      <p>RTL: {isRTL ? 'Yes' : 'No'}</p>
    </>
  );
}
```

---

## 🌍 Step 4: Add Language Switcher

Add the language switcher to your app header or navigation:

```jsx
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export function Header() {
  return (
    <header>
      <h1>My Store</h1>
      <LanguageSwitcher /> {/* Add this */}
    </header>
  );
}
```

**Result:** Users can click to switch languages, and:
- ✅ All component text translates
- ✅ RTL automatically applies for Arabic
- ✅ Language persists in localStorage

---

## 📝 Step 5: Add More Translations

### Adding English Translations

Edit `src/config/locales/en.json`:

```json
{
  "store": {
    "welcome": "Welcome to our store",
    "product_name": "Product Name",
    "price": "Price",
    "add_to_cart": "Add to Cart"
  },
  "seller": {
    "dashboard": "Seller Dashboard",
    "sales": "Sales",
    "orders": "Orders"
  }
}
```

### Adding Spanish Translations

Edit `src/config/locales/es.json`:

```json
{
  "store": {
    "welcome": "Bienvenido a nuestra tienda",
    "product_name": "Nombre del Producto",
    "price": "Precio",
    "add_to_cart": "Agregar al Carrito"
  },
  "seller": {
    "dashboard": "Panel del Vendedor",
    "sales": "Ventas",
    "orders": "Pedidos"
  }
}
```

### Adding Arabic Translations (RTL)

Edit `src/config/locales/ar.json`:

```json
{
  "store": {
    "welcome": "أهلا بك في متجرنا",
    "product_name": "اسم المنتج",
    "price": "السعر",
    "add_to_cart": "أضف إلى السلة"
  },
  "seller": {
    "dashboard": "لوحة تحكم البائع",
    "sales": "المبيعات",
    "orders": "الطلبات"
  }
}
```

---

## 🔄 Advanced: Namespaces

Organize large translation sets into namespaces:

```
src/config/locales/
├── en.json
├── es.json
├── fr.json
├── ar.json
├── admin/
│   ├── en.json
│   ├── es.json
│   ├── fr.json
│   └── ar.json
└── seller/
    ├── en.json
    ├── es.json
    ├── fr.json
    └── ar.json
```

Usage:

```jsx
const { t } = useTranslation(['common', 'admin']);
<p>{t('admin:dashboard.title')}</p>
```

---

## 🎨 RTL Styling

RTL is automatically applied when language is Arabic. Your components will:
- ✅ Flip text direction
- ✅ Reverse button icon positions
- ✅ Adjust input padding
- ✅ Mirror form layouts

All automatic - no code changes needed!

```css
/* Applied automatically for RTL languages */
[dir='rtl'] {
  direction: rtl;
  text-align: right;
}

[dir='rtl'] .input {
  text-align: right;
  padding-left: 0.75rem;
  padding-right: 2.5rem;
}

/* And more... see src/styles/rtl.css */
```

---

## 💡 Translation Examples

### Form with Validation Errors

```jsx
import { Form } from '@/components-library';
import { useTranslation } from 'react-i18next';

export function LoginForm() {
  const { t } = useTranslation();

  const handleSubmit = (data) => {
    // Submit logic
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        name="email"
        type="email"
        labelI18n="inputs.email"
        placeholderI18n="inputs.email"
        required
        validation={{
          required: t('validation.required_field'),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('validation.invalid_email'),
          },
        }}
      />
      <Form.Input
        name="password"
        type="password"
        labelI18n="inputs.password"
        required
        validation={{
          required: t('validation.required_field'),
          minLength: {
            value: 6,
            message: t('validation.password_min_length'),
          },
        }}
      />
      <Form.Submit i18nKey="buttons.login" />
    </Form>
  );
}
```

### Dynamic Error Messages

```jsx
import { useTranslation } from 'react-i18next';

export function ErrorDisplay({ error }) {
  const { t } = useTranslation();

  const errorKey = `errors.${error.code}`;
  const message = t(errorKey, { defaultValue: error.message });

  return <div className="error">{message}</div>;
}
```

### Pluralization

```json
{
  "items_count": {
    "one": "You have 1 item",
    "other": "You have {{count}} items"
  }
}
```

```jsx
const { t } = useTranslation();
<p>{t('items_count', { count: 5 })}</p> {/* "You have 5 items" */}
```

---

## 🗂️ File Structure

```
src/
├── config/
│   ├── i18n.js (Main i18n setup)
│   └── locales/
│       ├── en.json (English)
│       ├── es.json (Spanish)
│       ├── fr.json (French)
│       └── ar.json (Arabic)
├── context/
│   └── LanguageContext.js (Language management)
├── components/
│   └── LanguageSwitcher/
│       ├── LanguageSwitcher.jsx
│       └── LanguageSwitcher.css
├── styles/
│   ├── theme-variables.css
│   └── rtl.css (RTL support)
└── components-library/
    ├── Button/ (Supports i18nKey)
    ├── Input/ (Supports labelI18n, errorI18n)
    └── Form/
```

---

## 🚀 Common Use Cases

### Use Case 1: Multi-language Store

```jsx
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export function Store() {
  return (
    <>
      <header>
        <h1>Store</h1>
        <LanguageSwitcher /> {/* Top right */}
      </header>
      <ProductList />
    </>
  );
}
```

### Use Case 2: Admin Dashboard (Multiple Namespaces)

```jsx
export function AdminDashboard() {
  const { t } = useTranslation(['common', 'admin']);

  return (
    <>
      <h1>{t('admin:dashboard.title')}</h1>
      <Button i18nKey="buttons.save" />
    </>
  );
}
```

### Use Case 3: Seller Store with Language

```jsx
import { useLanguage } from '@/context/LanguageContext';

export function SellerStore() {
  const { language, isRTL } = useLanguage();

  // Fetch seller data in correct language
  const sellerData = fetchSellerData(language);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Content */}
    </div>
  );
}
```

---

## 🔌 API Integration

Fetch translations from server instead of local files:

```javascript
// src/config/i18n.js - Backend resources

i18next.init({
  resources: null, // Don't use local resources
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    loadPath: 'https://api.example.com/i18n/{{lng}}/{{ns}}',
  },
  // ... more config
});
```

---

## ✅ Verification Checklist

- ✅ Dependencies installed
- ✅ App.js updated with LanguageProvider
- ✅ i18n config initialized
- ✅ RTL CSS imported
- ✅ Translation files created (en, es, fr, ar)
- ✅ Button component uses i18nKey
- ✅ Input component uses labelI18n
- ✅ LanguageSwitcher component works
- ✅ Language switching changes text
- ✅ Arabic switches to RTL automatically

---

## 📊 Translation Keys Available

### Common
- `common.loading`, `common.error`, `common.success`, etc.

### Buttons
- `buttons.submit`, `buttons.cancel`, `buttons.save`, `buttons.delete`, etc.

### Inputs
- `inputs.email`, `inputs.password`, `inputs.username`, `inputs.first_name`, etc.

### Validation
- `validation.required_field`, `validation.invalid_email`, etc.

### Errors
- `errors.network_error`, `errors.server_error`, `errors.unauthorized`, etc.

### Messages
- `messages.saved_successfully`, `messages.deleted_successfully`, etc.

Add more as needed!

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Setup App.js with LanguageProvider
3. ✅ Add LanguageSwitcher to header
4. ✅ Update components to use translation keys
5. ✅ Add more translations to JSON files
6. ✅ Test language switching works
7. ✅ Test RTL works for Arabic

---

**Result:** Fully multilingual app with automatic RTL support! 🌍
