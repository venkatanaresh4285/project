import React from 'react';
import { BuilderSidebar } from './BuilderSidebar';
import { BuilderCanvas } from './BuilderCanvas';
import { FieldProperties } from './FieldProperties';
import { FormPreview } from './FormPreview';
import { useFormBuilder } from '../../contexts/FormBuilderContext';
import { templates } from '../../utils/templates';
import { Button } from '../ui/Button';
import { createShareableUrl } from '../../utils/helpers';
import { 
  Save, 
  Copy, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Share2
} from 'lucide-react';

export const FormBuilder: React.FC = () => {
  const {
    state,
    addField,
    updateField,
    deleteField,
    selectField,
    moveField,
    setDragging,
    addStep,
    deleteStep,
    updateStep,
    setCurrentStep,
    updateFormDetails,
    setPreviewMode,
    togglePreviewValidation,
    saveCurrentForm,
    loadForm,
    createNewForm
  } = useFormBuilder();
  
  const { 
    form, 
    currentStepIndex, 
    selectedFieldId, 
    previewMode, 
    previewValidation 
  } = state;
  
  const currentStep = form.steps[currentStepIndex];
  const selectedField = selectedFieldId 
    ? currentStep.fields.find(field => field.id === selectedFieldId) 
    : null;
  
  const handleLoadTemplate = (templateName: keyof typeof templates) => {
    const templateForm = templates[templateName]();
    loadForm(templateForm.id);
  };
  
  const handleCopyShareableLink = () => {
    const url = createShareableUrl(form.id);
    navigator.clipboard.writeText(url);
    alert(`Shareable link copied to clipboard: ${url}`);
  };
  
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateFormDetails({ title: e.target.value })}
              className="text-xl font-semibold w-full border-none p-0 focus:outline-none focus:ring-0"
              placeholder="Untitled Form"
            />
            <input
              type="text"
              value={form.description || ''}
              onChange={(e) => updateFormDetails({ description: e.target.value })}
              className="text-sm text-gray-500 w-full border-none p-0 focus:outline-none focus:ring-0"
              placeholder="Form description"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={createNewForm}
            >
              New
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Save size={16} />}
              onClick={saveCurrentForm}
            >
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Share2 size={16} />}
              onClick={handleCopyShareableLink}
            >
              Share
            </Button>
          </div>
        </div>
      </header>
      
      {/* Step Navigation */}
      {form.steps.length > 1 && (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {form.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`
                  px-3 py-1 text-sm rounded-md whitespace-nowrap
                  ${currentStepIndex === index 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                {step.title}
              </button>
            ))}
            <button
              onClick={addStep}
              className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-md"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Field Options */}
        <div className="w-64 border-r border-gray-200 flex-shrink-0">
          <BuilderSidebar 
            onAddField={addField} 
            onLoadTemplate={handleLoadTemplate}
          />
        </div>
        
        {/* Main Canvas */}
        <div className="flex-1 overflow-hidden">
          <BuilderCanvas
            fields={currentStep.fields}
            selectedFieldId={selectedFieldId}
            onSelectField={selectField}
            onMoveField={moveField}
            onSetDragging={setDragging}
            stepTitle={currentStep.title}
            onUpdateStepTitle={(title) => updateStep(currentStep.id, { title })}
          />
        </div>
        
        {/* Right Panel - Properties or Preview */}
        <div className="w-96 flex-shrink-0 border-l border-gray-200">
          {selectedField ? (
            <FieldProperties
              field={selectedField}
              onUpdate={(updates) => updateField(selectedField.id, updates)}
              onDelete={() => deleteField(selectedField.id)}
            />
          ) : (
            <FormPreview
              steps={form.steps}
              currentStepIndex={currentStepIndex}
              previewMode={previewMode}
              previewValidation={previewValidation}
              onChangePreviewMode={setPreviewMode}
              onToggleValidation={togglePreviewValidation}
            />
          )}
        </div>
      </div>
    </div>
  );
};