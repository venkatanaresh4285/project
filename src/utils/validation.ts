import { FormField } from '../types/form';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateField = (field: FormField, value: any): ValidationResult => {
  const { validation } = field;
  
  // Check required
  if (validation.required && (value === undefined || value === null || value === '')) {
    return { 
      valid: false, 
      error: `${field.label} is required` 
    };
  }
  
  // Skip other validations if field is empty and not required
  if (value === undefined || value === null || value === '') {
    return { valid: true };
  }
  
  // Check min length
  if (validation.minLength && typeof value === 'string' && value.length < validation.minLength) {
    return { 
      valid: false, 
      error: `${field.label} must be at least ${validation.minLength} characters` 
    };
  }
  
  // Check max length
  if (validation.maxLength && typeof value === 'string' && value.length > validation.maxLength) {
    return { 
      valid: false, 
      error: `${field.label} must be no more than ${validation.maxLength} characters` 
    };
  }
  
  // Check pattern
  if (validation.pattern && typeof value === 'string') {
    const regex = new RegExp(validation.pattern);
    if (!regex.test(value)) {
      return { 
        valid: false, 
        error: validation.patternError || `${field.label} format is invalid` 
      };
    }
  }
  
  return { valid: true };
};

export const validateStep = (fields: FormField[], values: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  fields.forEach(field => {
    const result = validateField(field, values[field.id]);
    if (!result.valid && result.error) {
      errors[field.id] = result.error;
    }
  });
  
  return errors;
};