import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Form, FormField, FormStep, BuilderState } from '../types/form';
import { generateId, moveItem, deepClone } from '../utils/helpers';
import { saveForm, getFormById } from '../utils/storage';

interface FormBuilderContextType {
  state: BuilderState;
  addField: (type: FormField['type']) => void;
  updateField: (fieldId: string, updates: Partial<FormField>) => void;
  deleteField: (fieldId: string) => void;
  selectField: (fieldId: string | null) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  setDragging: (isDragging: boolean) => void;
  addStep: () => void;
  deleteStep: (stepId: string) => void;
  updateStep: (stepId: string, updates: Partial<FormStep>) => void;
  setCurrentStep: (index: number) => void;
  updateFormDetails: (updates: { title?: string; description?: string }) => void;
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  togglePreviewValidation: () => void;
  saveCurrentForm: () => void;
  loadForm: (formId: string) => void;
  createNewForm: () => void;
}

type Action =
  | { type: 'ADD_FIELD'; payload: { type: FormField['type'] } }
  | { type: 'UPDATE_FIELD'; payload: { fieldId: string; updates: Partial<FormField> } }
  | { type: 'DELETE_FIELD'; payload: { fieldId: string } }
  | { type: 'SELECT_FIELD'; payload: { fieldId: string | null } }
  | { type: 'MOVE_FIELD'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'SET_DRAGGING'; payload: { isDragging: boolean } }
  | { type: 'ADD_STEP' }
  | { type: 'DELETE_STEP'; payload: { stepId: string } }
  | { type: 'UPDATE_STEP'; payload: { stepId: string; updates: Partial<FormStep> } }
  | { type: 'SET_CURRENT_STEP'; payload: { index: number } }
  | { type: 'UPDATE_FORM_DETAILS'; payload: { title?: string; description?: string } }
  | { type: 'SET_PREVIEW_MODE'; payload: { mode: 'desktop' | 'tablet' | 'mobile' } }
  | { type: 'TOGGLE_PREVIEW_VALIDATION' }
  | { type: 'LOAD_FORM'; payload: { form: Form } }
  | { type: 'CREATE_NEW_FORM' };

const createDefaultForm = (): Form => {
  const now = Date.now();
  return {
    id: generateId(),
    title: 'Untitled Form',
    steps: [
      {
        id: generateId(),
        title: 'Step 1',
        fields: []
      }
    ],
    createdAt: now,
    updatedAt: now
  };
};

const createDefaultState = (): BuilderState => {
  return {
    form: createDefaultForm(),
    currentStepIndex: 0,
    selectedFieldId: null,
    isDragging: false,
    previewMode: 'desktop',
    previewValidation: false
  };
};

const formBuilderReducer = (state: BuilderState, action: Action): BuilderState => {
  const newState = deepClone(state);
  const currentStep = newState.form.steps[newState.currentStepIndex];
  
  switch (action.type) {
    case 'ADD_FIELD': {
      const { type } = action.payload;
      const newField: FormField = {
        id: generateId(),
        type,
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        validation: { required: false }
      };
      
      if (['dropdown', 'radio'].includes(type)) {
        newField.options = ['Option 1', 'Option 2', 'Option 3'];
      }
      
      currentStep.fields.push(newField);
      newState.selectedFieldId = newField.id;
      break;
    }
    
    case 'UPDATE_FIELD': {
      const { fieldId, updates } = action.payload;
      const fieldIndex = currentStep.fields.findIndex(f => f.id === fieldId);
      
      if (fieldIndex >= 0) {
        currentStep.fields[fieldIndex] = {
          ...currentStep.fields[fieldIndex],
          ...updates
        };
      }
      break;
    }
    
    case 'DELETE_FIELD': {
      const { fieldId } = action.payload;
      currentStep.fields = currentStep.fields.filter(f => f.id !== fieldId);
      
      if (state.selectedFieldId === fieldId) {
        newState.selectedFieldId = null;
      }
      break;
    }
    
    case 'SELECT_FIELD': {
      newState.selectedFieldId = action.payload.fieldId;
      break;
    }
    
    case 'MOVE_FIELD': {
      const { fromIndex, toIndex } = action.payload;
      currentStep.fields = moveItem(currentStep.fields, fromIndex, toIndex);
      break;
    }
    
    case 'SET_DRAGGING': {
      newState.isDragging = action.payload.isDragging;
      break;
    }
    
    case 'ADD_STEP': {
      const newStep: FormStep = {
        id: generateId(),
        title: `Step ${newState.form.steps.length + 1}`,
        fields: []
      };
      
      newState.form.steps.push(newStep);
      newState.currentStepIndex = newState.form.steps.length - 1;
      newState.selectedFieldId = null;
      break;
    }
    
    case 'DELETE_STEP': {
      const { stepId } = action.payload;
      
      if (newState.form.steps.length <= 1) {
        return state; // Don't delete the last step
      }
      
      const stepIndex = newState.form.steps.findIndex(s => s.id === stepId);
      newState.form.steps = newState.form.steps.filter(s => s.id !== stepId);
      
      // Adjust current step index if needed
      if (stepIndex <= newState.currentStepIndex) {
        newState.currentStepIndex = Math.max(0, newState.currentStepIndex - 1);
      }
      
      newState.selectedFieldId = null;
      break;
    }
    
    case 'UPDATE_STEP': {
      const { stepId, updates } = action.payload;
      const stepIndex = newState.form.steps.findIndex(s => s.id === stepId);
      
      if (stepIndex >= 0) {
        newState.form.steps[stepIndex] = {
          ...newState.form.steps[stepIndex],
          ...updates
        };
      }
      break;
    }
    
    case 'SET_CURRENT_STEP': {
      newState.currentStepIndex = action.payload.index;
      newState.selectedFieldId = null;
      break;
    }
    
    case 'UPDATE_FORM_DETAILS': {
      const { title, description } = action.payload;
      
      if (title !== undefined) {
        newState.form.title = title;
      }
      
      if (description !== undefined) {
        newState.form.description = description;
      }
      break;
    }
    
    case 'SET_PREVIEW_MODE': {
      newState.previewMode = action.payload.mode;
      break;
    }
    
    case 'TOGGLE_PREVIEW_VALIDATION': {
      newState.previewValidation = !newState.previewValidation;
      break;
    }
    
    case 'LOAD_FORM': {
      return {
        ...newState,
        form: action.payload.form,
        currentStepIndex: 0,
        selectedFieldId: null
      };
    }
    
    case 'CREATE_NEW_FORM': {
      return createDefaultState();
    }
  }
  
  // Update the form's updatedAt timestamp
  newState.form.updatedAt = Date.now();
  return newState;
};

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formBuilderReducer, null, createDefaultState);
  
  // Auto-save when the form changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveForm(state.form);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [state.form]);
  
  const value: FormBuilderContextType = {
    state,
    addField: (type) => dispatch({ type: 'ADD_FIELD', payload: { type } }),
    updateField: (fieldId, updates) => 
      dispatch({ type: 'UPDATE_FIELD', payload: { fieldId, updates } }),
    deleteField: (fieldId) => 
      dispatch({ type: 'DELETE_FIELD', payload: { fieldId } }),
    selectField: (fieldId) => 
      dispatch({ type: 'SELECT_FIELD', payload: { fieldId } }),
    moveField: (fromIndex, toIndex) => 
      dispatch({ type: 'MOVE_FIELD', payload: { fromIndex, toIndex } }),
    setDragging: (isDragging) => 
      dispatch({ type: 'SET_DRAGGING', payload: { isDragging } }),
    addStep: () => dispatch({ type: 'ADD_STEP' }),
    deleteStep: (stepId) => 
      dispatch({ type: 'DELETE_STEP', payload: { stepId } }),
    updateStep: (stepId, updates) => 
      dispatch({ type: 'UPDATE_STEP', payload: { stepId, updates } }),
    setCurrentStep: (index) => 
      dispatch({ type: 'SET_CURRENT_STEP', payload: { index } }),
    updateFormDetails: (updates) => 
      dispatch({ type: 'UPDATE_FORM_DETAILS', payload: updates }),
    setPreviewMode: (mode) => 
      dispatch({ type: 'SET_PREVIEW_MODE', payload: { mode } }),
    togglePreviewValidation: () => 
      dispatch({ type: 'TOGGLE_PREVIEW_VALIDATION' }),
    saveCurrentForm: () => saveForm(state.form),
    loadForm: (formId) => {
      const form = getFormById(formId);
      if (form) {
        dispatch({ type: 'LOAD_FORM', payload: { form } });
      }
    },
    createNewForm: () => dispatch({ type: 'CREATE_NEW_FORM' })
  };
  
  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = (): FormBuilderContextType => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};