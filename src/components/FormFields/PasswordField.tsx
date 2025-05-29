import React, { useState } from 'react';
import { FormField } from '../../types/form';
import { ValidationResult } from '../../utils/validation';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  validation: ValidationResult;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  field,
  value = '',
  onChange,
  validation
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={inputClasses}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};