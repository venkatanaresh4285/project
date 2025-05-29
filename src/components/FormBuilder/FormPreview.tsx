import React, { useState } from 'react';
import { FormField as FormFieldType, FormStep } from '../../types/form';
import { FormField } from '../FormFields';
import { Button } from '../ui/Button';
import { LampDesk as Desktop, Tablet, Smartphone, AlertCircle } from 'lucide-react';

interface FormPreviewProps {
  steps: FormStep[];
  currentStepIndex: number;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  previewValidation: boolean;
  onChangePreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onToggleValidation: () => void;
}

export const FormPreview: React.FC<FormPreviewProps> = ({
  steps,
  currentStepIndex,
  previewMode,
  previewValidation,
  onChangePreviewMode,
  onToggleValidation
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [currentDisplayStep, setCurrentDisplayStep] = useState(0);
  
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value
    }));
  };
  
  const handleNextStep = () => {
    if (currentDisplayStep < steps.length - 1) {
      setCurrentDisplayStep(currentDisplayStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentDisplayStep > 0) {
      setCurrentDisplayStep(currentDisplayStep - 1);
    }
  };
  
  const currentStep = steps[currentDisplayStep] || steps[0];
  
  // Device size classes based on preview mode
  const containerClasses = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto border border-gray-200 rounded-lg shadow-sm',
    mobile: 'w-[375px] mx-auto border border-gray-200 rounded-lg shadow-sm'
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Form Preview</h2>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-100 rounded-md p-1">
            <button
              onClick={() => onChangePreviewMode('desktop')}
              className={`p-1 rounded ${previewMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}
              title="Desktop View"
            >
              <Desktop size={18} />
            </button>
            <button
              onClick={() => onChangePreviewMode('tablet')}
              className={`p-1 rounded ${previewMode === 'tablet' ? 'bg-white shadow-sm' : ''}`}
              title="Tablet View"
            >
              <Tablet size={18} />
            </button>
            <button
              onClick={() => onChangePreviewMode('mobile')}
              className={`p-1 rounded ${previewMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}
              title="Mobile View"
            >
              <Smartphone size={18} />
            </button>
          </div>
          
          <button
            onClick={onToggleValidation}
            className={`p-1 rounded-md ${previewValidation ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            title="Toggle Validation"
          >
            <AlertCircle size={18} />
          </button>
        </div>
      </div>
      
      <div className={`flex-1 overflow-y-auto ${containerClasses[previewMode]}`}>
        <div className="bg-white p-6 rounded-lg shadow-sm h-full overflow-y-auto">
          {steps.length > 1 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{currentStep.title}</h3>
                <span className="text-sm text-gray-500">
                  Step {currentDisplayStep + 1} of {steps.length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentDisplayStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {currentStep.fields.map((field: FormFieldType) => (
              <FormField
                key={field.id}
                field={field}
                value={formValues[field.id] || ''}
                onChange={(value) => handleFieldChange(field.id, value)}
                showValidation={previewValidation}
              />
            ))}
          </div>
          
          {steps.length > 1 && (
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentDisplayStep === 0}
              >
                Previous
              </Button>
              
              {currentDisplayStep < steps.length - 1 ? (
                <Button onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button>
                  Submit
                </Button>
              )}
            </div>
          )}
          
          {steps.length === 1 && (
            <div className="mt-6">
              <Button isFullWidth>
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};