/**
 * Button Component Library
 * Unified button component for entire app
 * Supports: primary, secondary, danger, success, outline variants
 * Sizes: sm, md, lg
 * States: default, loading, disabled
 * i18n: Supports translation keys
 *
 * Usage:
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="danger" loading>Deleting...</Button>
 * <Button i18nKey="buttons.submit">Localized Submit</Button>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  className = '',
  i18nKey,
  ...props
}) => {
  const { t } = useTranslation();

  const buttonText = i18nKey ? t(i18nKey) : children;

  const buttonClass = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    (disabled || loading) && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn__spinner" aria-hidden="true" />
          <span>{buttonText}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="btn__icon btn__icon--left" aria-hidden="true" />
          )}
          <span>{buttonText}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className="btn__icon btn__icon--right" aria-hidden="true" />
          )}
        </>
      )}
    </button>,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  i18nKey: PropTypes.string,
};

Button.defaultProps = {
  children: undefined
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
