import { Form, FormStep } from '../types/form';
import { generateId } from './helpers';

const createContactForm = (): Form => {
  const now = Date.now();
  
  const fields = [
    {
      id: generateId(),
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your full name',
      validation: { required: true }
    },
    {
      id: generateId(),
      type: 'email',
      label: 'Email',
      placeholder: 'your.email@example.com',
      helpText: 'We\'ll never share your email with anyone else.',
      validation: { 
        required: true, 
        pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
        patternError: 'Please enter a valid email address'
      }
    },
    {
      id: generateId(),
      type: 'textarea',
      label: 'Message',
      placeholder: 'How can we help you?',
      validation: { 
        required: true,
        minLength: 10
      }
    }
  ];
  
  const step: FormStep = {
    id: generateId(),
    title: 'Contact Information',
    fields
  };
  
  return {
    id: generateId(),
    title: 'Contact Us Form',
    description: 'A simple contact form template',
    steps: [step],
    createdAt: now,
    updatedAt: now
  };
};

const createSurveyForm = (): Form => {
  const now = Date.now();
  
  const step1: FormStep = {
    id: generateId(),
    title: 'Personal Information',
    fields: [
      {
        id: generateId(),
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        validation: { required: true }
      },
      {
        id: generateId(),
        type: 'email',
        label: 'Email Address',
        placeholder: 'your.email@example.com',
        validation: { required: true }
      }
    ]
  };
  
  const step2: FormStep = {
    id: generateId(),
    title: 'Survey Questions',
    fields: [
      {
        id: generateId(),
        type: 'radio',
        label: 'How satisfied are you with our service?',
        options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
        validation: { required: true }
      },
      {
        id: generateId(),
        type: 'textarea',
        label: 'Do you have any suggestions for improvement?',
        placeholder: 'Your feedback is valuable to us',
        validation: { required: false }
      }
    ]
  };
  
  return {
    id: generateId(),
    title: 'Customer Satisfaction Survey',
    description: 'A template for gathering customer feedback',
    steps: [step1, step2],
    createdAt: now,
    updatedAt: now
  };
};

export const templates = {
  contactForm: createContactForm,
  surveyForm: createSurveyForm
};