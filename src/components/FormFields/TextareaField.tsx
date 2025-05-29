import React from 'react';
import { FormField } from '../../types/form';
import { ValidationResult } from '../../utils/validation';

interface TextareaFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  validation: ValidationResult;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  field,
  value = '',
  onChange,
  validation
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  
  const textareaClasses = `
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
      <textarea
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={textareaClasses}
        rows={4}
      />
    </div>
  );
};