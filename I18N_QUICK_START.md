# i18n Quick Setup (5 Minutes)

## What You Get ✅

- ✅ 4 languages: English, Spanish, French, Arabic
- ✅ Automatic RTL for Arabic
- ✅ Language switcher component
- ✅ Component i18n support (Button, Input, Form)
- ✅ Translation keys for common UI text

---

## 🚀 Setup: 5 Steps (5 minutes)

### Step 1: Install (1 minute)

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### Step 2: Update App.js (2 minutes)

```javascript
// src/App.js
import { LanguageProvider } from './context/LanguageContext'; // NEW
import { ThemeProvider } from './context/ThemeContext';
import i18n from './config/i18n'; // NEW
import './styles/rtl.css'; // NEW

i18n.init(); // NEW

export default function Root() {
  return (
    <LanguageProvider> {/* NEW - Wrap here */}
      <ThemeProvider>
        {/* ... rest of app ... */}
      </ThemeProvider>
    </LanguageProvider>
  );
}
```

### Step 3: Add Language Switcher (1 minute)

```jsx
// In your Header component
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export function Header() {
  return (
    <header>
      <h1>My App</h1>
      <LanguageSwitcher />
    </header>
  );
}
```

### Step 4: Use in Components (1 minute)

**Option A: Using i18n keys (Simplest)**
```jsx
<Button i18nKey="buttons.submit" />
<Input labelI18n="inputs.email" type="email" />
```

**Option B: Using hook**
```jsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Button>{t('buttons.submit')}</Button>
```

### Step 5: Test (0 minutes)

Click language switcher:
- ✅ Text changes to new language
- ✅ Arabic switches to RTL
- ✅ Language persists on refresh

---

## 📁 Files Created

```
✅ src/config/i18n.js
✅ src/config/locales/en.json
✅ src/config/locales/es.json
✅ src/config/locales/fr.json
✅ src/config/locales/ar.json
✅ src/context/LanguageContext.js
✅ src/components/LanguageSwitcher/
✅ src/styles/rtl.css
```

---

## 📝 Translation Keys

### Pre-created translation keys:

```
common.*
├─ loading
├─ error
├─ success
├─ warning
├─ info
├─ required
└─ optional

buttons.*
├─ submit
├─ cancel
├─ save
├─ delete
├─ edit
├─ add
├─ search
├─ login
├─ logout
└─ signup

inputs.*
├─ email
├─ password
├─ username
├─ first_name
├─ last_name
├─ phone
└─ address

validation.*
├─ required_field
├─ invalid_email
├─ password_min_length
└─ password_mismatch

errors.*
├─ network_error
├─ server_error
├─ invalid_credentials
└─ unauthorized

messages.*
├─ saved_successfully
├─ deleted_successfully
├─ updated_successfully
└─ operation_failed
```

---

## 🔧 Add More Translations

**Edit English translations:**
```json
// src/config/locales/en.json
{
  "store": {
    "welcome": "Welcome",
    "product": "Product",
    "price": "Price"
  }
}
```

**Edit Spanish translations:**
```json
// src/config/locales/es.json
{
  "store": {
    "welcome": "Bienvenido",
    "product": "Producto",
    "price": "Precio"
  }
}
```

**Add to other languages too:**
- fr.json (French)
- ar.json (Arabic)

---

## 💡 Usage Examples

### Example 1: Button with Translation
```jsx
<Button 
  variant="primary" 
  i18nKey="buttons.save"
/>
// Renders: "Save" in English, "Guardar" in Spanish, etc.
```

### Example 2: Input with Translation
```jsx
<Input 
  labelI18n="inputs.email"
  type="email"
  placeholderI18n="inputs.email"
/>
// Renders: "Email" label, "Email" placeholder in current language
```

### Example 3: Form with Translation
```jsx
<Form onSubmit={handleSubmit}>
  <Form.Input 
    name="email"
    type="email"
    labelI18n="inputs.email"
    required
  />
  <Form.Input 
    name="password"
    type="password"
    labelI18n="inputs.password"
    required
  />
  <Form.Submit i18nKey="buttons.login" />
</Form>
// Renders all text in current language
```

### Example 4: Using useTranslation Hook
```jsx
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <>
      <h1>{t('common.welcome')}</h1>
      <p>{t('messages.saved_successfully')}</p>
    </>
  );
}
```

---

## 🌍 Language Behavior

### English (en)
- LTR (Left-to-Right)
- Normal text alignment

### Spanish (es)
- LTR (Left-to-Right)
- Normal text alignment

### French (fr)
- LTR (Left-to-Right)
- Normal text alignment

### Arabic (ar)
- RTL (Right-to-Left) ✨
- Text flips automatically
- Buttons mirror
- Inputs adjust padding

All automatic - no code needed!

---

## ✅ Verification

Test language switching:

```jsx
// In your app, add temporarily:
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

<LanguageSwitcher />

// Click to switch languages:
// EN → ES → FR → AR (notice RTL)
```

Expected:
- ✅ Text changes instantly
- ✅ Arabic shows RTL text
- ✅ Icons/buttons mirror for Arabic
- ✅ Language persists on refresh

---

## 📚 Full Documentation

See **I18N_INTEGRATION_GUIDE.md** for:
- Complete setup instructions
- Advanced features
- Namespaces
- API integration
- More examples

---

## 🎯 What's Next

1. ✅ Run: `npm install i18next react-i18next i18next-browser-languagedetector`
2. ✅ Update App.js with LanguageProvider
3. ✅ Add LanguageSwitcher to header
4. ✅ Use i18nKey/labelI18n in components
5. ✅ Add more translations as needed

**Result:** Fully multilingual app in 5 minutes! 🌍
