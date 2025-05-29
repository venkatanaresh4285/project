import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormById } from '../utils/storage';
import { Form, FormField as FormFieldType } from '../types/form';
import { FormField } from '../components/FormFields';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { validateStep } from '../utils/validation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const FormFillPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (formId) {
      const foundForm = getFormById(formId);
      if (foundForm) {
        setForm(foundForm);
      }
      setLoading(false);
    }
  }, [formId]);
  
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value
    }));
    
    // Clear error for this field when value changes
    if (errors[fieldId]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };
  
  const validateCurrentStep = (): boolean => {
    if (!form) return false;
    
    const stepFields = form.steps[currentStep].fields;
    const stepErrors = validateStep(stepFields, formValues);
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (!form) return;
    
    const isValid = validateCurrentStep();
    
    if (isValid && currentStep < form.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form) return;
    
    const isValid = validateCurrentStep();
    
    if (isValid) {
      // In a real app, you would submit the form data to your backend here
      console.log('Form submitted:', formValues);
      setIsSubmitted(true);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading form...</p>
      </div>
    );
  }
  
  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardBody>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500 mb-2">Form Not Found</h1>
              <p className="text-gray-600 mb-6">
                The form you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/')}>
                Go to Form Builder
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardBody>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check size={32} className="text-green-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-green-600 mb-2">Form Submitted!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for completing the form. Your response has been recorded.
              </p>
              <Button onClick={() => navigate('/')}>
                Back to Form Builder
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  const currentFields = form.steps[currentStep].fields;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-gray-800">{form.title}</h1>
            {form.description && (
              <p className="text-gray-600 mt-1">{form.description}</p>
            )}
            
            {form.steps.length > 1 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Step {currentStep + 1} of {form.steps.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {form.steps[currentStep].title}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentStep + 1) / form.steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardHeader>
          
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {currentFields.map((field: FormFieldType) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formValues[field.id] || ''}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    showValidation={!!errors[field.id]}
                  />
                ))}
              </div>
            </form>
          </CardBody>
          
          <CardFooter>
            <div className="flex justify-between w-full">
              {currentStep > 0 ? (
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < form.steps.length - 1 ? (
                <Button 
                  onClick={handleNextStep}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  rightIcon={<Check size={16} />}
                >
                  Submit
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FormFillPage;