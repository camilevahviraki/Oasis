/**
 * Input Component Library
 * Unified input component (text, email, password, number, etc.)
 * Replaces: user-authentication-form-input and scattered input styles
 * i18n: Supports translation keys for labels and errors
 *
 * Usage:
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Password" type="password" required error="Password is required" />
 * <Input labelI18n="inputs.email" type="email" />
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Input.css';

export const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  hint,
  required = false,
  disabled = false,
  icon: Icon,
  fullWidth = false,
  size = 'md',
  className = '',
  labelI18n,
  placeholderI18n,
  errorI18n,
  ...props
}, ref) => {
  const { t } = useTranslation();

  const resolvedLabel = labelI18n ? t(labelI18n) : label;
  const resolvedPlaceholder = placeholderI18n ? t(placeholderI18n) : placeholder;
  const resolvedError = errorI18n ? t(errorI18n) : error;

  const inputClass = [
    'input-wrapper',
    fulresolvedLabel && (
        <label className="input-label">
          {resolvedLabel}
          {required && <span className="input-required" aria-label="required">*</span>}
        </label>
      )}

      <div className="input-container">
        {Icon && <Icon className="input-icon input-icon--left" aria-hidden="true" />}
        
        <input
          ref={ref}
          type={type}
          placeholder={resolvedPlaceholder}
          disabled={disabled}
          className={`input input--${size} ${Icon ? 'input--with-icon' : ''} ${className}`}
          aria-invalid={!!resolvedError}
          aria-describedby={resolvedError ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
          {...props}
        />
      </div>

      {resolvedError && (
        <span className="input-error" id={`${props.id}-error`} role="alert">
          {resolvedError}
        </span>
      )}

      {hint && !resolvedE
      </div>

      {error && (
        <span className="input-error" id={`${props.id}-error`} role="alert">
          {error}
        </span>
      )}

      {hint && !error && (
        <span className="input-hint" id={`${props.id}-hint`}>
          {hint}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time']),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  labelI18n: PropTypes.string,
  placeholderI18n: PropTypes.string,
  errorI18n: PropTypes.string,
};

export default Input;
