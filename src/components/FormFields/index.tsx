import React from 'react';
import { FormField as FormFieldType } from '../../types/form';
import { validateField } from '../../utils/validation';

// Field rendering components
import { TextField } from './TextField';
import { TextareaField } from './TextareaField';
import { DropdownField } from './DropdownField';
import { CheckboxField } from './CheckboxField';
import { RadioField } from './RadioField';
import { DateField } from './DateField';
import { NumberField } from './NumberField';
import { EmailField } from './EmailField';
import { PhoneField } from './PhoneField';
import { PasswordField } from './PasswordField';

interface FormFieldProps {
  field: FormFieldType;
  value: any;
  onChange: (value: any) => void;
  showValidation?: boolean;
  isBuilder?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  showValidation = false,
  isBuilder = false
}) => {
  // Common validation logic
  const validation = showValidation ? validateField(field, value) : { valid: true };
  
  const renderField = () => {
    switch (field.type) {
      case 'text':
        return <TextField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'textarea':
        return <TextareaField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'dropdown':
        return <DropdownField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'checkbox':
        return <CheckboxField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'radio':
        return <RadioField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'date':
        return <DateField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'number':
        return <NumberField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'email':
        return <EmailField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'phone':
        return <PhoneField field={field} value={value} onChange={onChange} validation={validation} />;
      case 'password':
        return <PasswordField field={field} value={value} onChange={onChange} validation={validation} />;
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };
  
  return (
    <div className={`mb-4 ${isBuilder ? 'pointer-events-none' : ''}`}>
      {renderField()}
      {field.helpText && !validation.error && (
        <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
      )}
      {validation.error && (
        <p className="mt-1 text-sm text-red-500">{validation.error}</p>
      )}
    </div>
  );
};