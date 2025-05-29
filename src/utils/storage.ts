import { Form } from '../types/form';

const STORAGE_KEY = 'form_builder_forms';

export const saveForms = (forms: Form[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
};

export const getForms = (): Form[] => {
  const forms = localStorage.getItem(STORAGE_KEY);
  return forms ? JSON.parse(forms) : [];
};

export const getFormById = (id: string): Form | undefined => {
  const forms = getForms();
  return forms.find(form => form.id === id);
};

export const saveForm = (form: Form): void => {
  const forms = getForms();
  const existingFormIndex = forms.findIndex(f => f.id === form.id);
  
  if (existingFormIndex >= 0) {
    forms[existingFormIndex] = form;
  } else {
    forms.push(form);
  }
  
  saveForms(forms);
};

export const deleteForm = (id: string): void => {
  const forms = getForms();
  saveForms(forms.filter(form => form.id !== id));
};