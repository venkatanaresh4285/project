import React from 'react';
import { FormBuilder } from '../components/FormBuilder';
import { FormBuilderProvider } from '../contexts/FormBuilderContext';

const FormBuilderPage: React.FC = () => {
  return (
    <FormBuilderProvider>
      <FormBuilder />
    </FormBuilderProvider>
  );
};

export default FormBuilderPage;