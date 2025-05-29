import React from 'react';
import { FormField } from '../../types/form';
import { ValidationResult } from '../../utils/validation';

interface CheckboxFieldProps {
  field: FormField;
  value: boolean;
  onChange: (value: boolean) => void;
  validation: ValidationResult;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  field,
  value = false,
  onChange,
  validation
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={value || false}
          onChange={handleChange}
          className={`
            h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500
            ${!validation.valid ? 'border-red-500' : ''}
          `}
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="font-medium text-gray-700">
          {field.label}
          {field.validation.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    </div>
  );
};