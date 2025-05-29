import React from 'react';
import { FormField } from '../../types/form';
import { ValidationResult } from '../../utils/validation';

interface NumberFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  validation: ValidationResult;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  field,
  value = '',
  onChange,
  validation
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  const inputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-blue-500 
    ${validation.valid ? 'border-gray-300' : 'border-red-500 focus:ring-red-500'}
  `;
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.validation.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={inputClasses}
      />
    </div>
  );
};