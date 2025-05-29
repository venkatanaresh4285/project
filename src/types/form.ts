export type FieldType = 
  | 'text'
  | 'textarea'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'number'
  | 'email'
  | 'phone'
  | 'password';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternError?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  options?: string[]; // For dropdown, radio, etc.
  defaultValue?: string | string[] | boolean;
  validation: ValidationRules;
}

export interface FormStep {
  id: string;
  title: string;
  fields: FormField[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  steps: FormStep[];
  createdAt: number;
  updatedAt: number;
}

export interface BuilderState {
  form: Form;
  currentStepIndex: number;
  selectedFieldId: string | null;
  isDragging: boolean;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  previewValidation: boolean;
}