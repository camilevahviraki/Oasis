/**
 * Form Component Library
 * Unified form component with react-hook-form integration
 * Replaces: FormR component, manual form handling
 *
 * Usage:
 * <Form onSubmit={handleSubmit} layout="vertical">
 *   <Form.Input name="email" type="email" label="Email" required />
 *   <Form.Input name="password" type="password" label="Password" required />
 *   <Form.Submit>Sign In</Form.Submit>
 * </Form>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Form.css';

export const Form = React.forwardRef(({
  children,
  onSubmit,
  layout = 'vertical',
  validation,
  defaultValues,
  className = '',
  ...props
}, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm({
    defaultValues,
    mode: 'onBlur',
  });

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className={`form form--${layout} ${className}`}
      noValidate
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        // Pass form methods to child components
        if (child.type === FormInput || child.type === FormSelect) {
          const fieldName = child.props.name;
          const fieldError = errors[fieldName];
          
          return React.cloneElement(child, {
            ...register(fieldName, validation?.[fieldName]),
            error: fieldError?.message,
            isSubmitting,
          });
        }

        if (child.type === FormSubmit) {
          return React.cloneElement(child, {
            loading: isSubmitting,
            disabled: isSubmitting || !isValid,
          });
        }

        return child;
      })}
    </form>
  );
});

Form.displayName = 'Form';

/**
 * Form.Input - Form field wrapper for Input component
 */
export const FormInput = React.forwardRef(({
  name,
  label,
  type = 'text',
  placeholder,
  error,
  hint,
  required = false,
  validation,
  ...props
}, ref) => (
  <Input
    ref={ref}
    name={name}
    label={label}
    type={type}
    placeholder={placeholder}
    error={error}
    hint={hint}
    required={required}
    {...props}
  />
));

FormInput.displayName = 'FormInput';

/**
 * Form.Select - Form field wrapper for select
 */
export const FormSelect = React.forwardRef(({
  name,
  label,
  options,
  error,
  required = false,
  placeholder = 'Select an option',
  ...props
}, ref) => (
  <div className="form-field">
    {label && (
      <label className="input-label">
        {label}
        {required && <span className="input-required">*</span>}
      </label>
    )}
    <select
      ref={ref}
      name={name}
      className="select"
      aria-invalid={!!error}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="input-error">{error}</span>}
  </div>
));

FormSelect.displayName = 'FormSelect';

/**
 * Form.Submit - Submit button wrapper
 */
export const FormSubmit = ({
  children = 'Submit',
  loading = false,
  disabled = false,
  ...props
}) => (
  <Button
    type="submit"
    variant="primary"
    loading={loading}
    disabled={disabled}
    {...props}
  >
    {children}
  </Button>
);

// Attach sub-components to Form
Form.Input = FormInput;
Form.Select = FormSelect;
Form.Submit = FormSubmit;

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
  validation: PropTypes.object,
  defaultValues: PropTypes.object,
  className: PropTypes.string,
};

export default Form;
