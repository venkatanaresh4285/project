import React from 'react';
import { FormField } from '../../types/form';
import { ValidationResult } from '../../utils/validation';

interface RadioFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  validation: ValidationResult;
}

export const RadioField: React.FC<RadioFieldProps> = ({
  field,
  value = '',
  onChange,
  validation
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div>
      <div className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.validation.required && <span className="text-red-500 ml-1">*</span>}
      </div>
      <div className="space-y-2">
        {field.options?.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`${field.id}-${index}`}
              name={field.id}
              value={option}
              checked={value === option}
              onChange={handleChange}
              className={`
                h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500
                ${!validation.valid ? 'border-red-500' : ''}
              `}
            />
            <label 
              htmlFor={`${field.id}-${index}`}
              className="ml-2 text-sm text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};