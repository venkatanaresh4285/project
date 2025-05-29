import React from 'react';
import { FormField, ValidationRules } from '../../types/form';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';

interface FieldPropertiesProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
}

export const FieldProperties: React.FC<FieldPropertiesProps> = ({
  field,
  onUpdate,
  onDelete
}) => {
  const updateField = (name: string, value: any) => {
    onUpdate({ [name]: value });
  };
  
  const updateValidation = (name: keyof ValidationRules, value: any) => {
    onUpdate({
      validation: {
        ...field.validation,
        [name]: value
      }
    });
  };
  
  const handleOptionsChange = (value: string) => {
    // Split by new line and filter out empty lines
    const options = value.split('\n').filter(option => option.trim() !== '');
    onUpdate({ options });
  };
  
  return (
    <div className="p-4 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Field Properties</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:bg-red-50"
          onClick={onDelete}
          leftIcon={<Trash2 size={16} />}
        >
          Delete
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Placeholder
          </label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={(e) => updateField('placeholder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Help Text
          </label>
          <input
            type="text"
            value={field.helpText || ''}
            onChange={(e) => updateField('helpText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {['dropdown', 'radio'].includes(field.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options (one per line)
            </label>
            <textarea
              value={(field.options || []).join('\n')}
              onChange={(e) => handleOptionsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-3">Validation</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                checked={field.validation.required || false}
                onChange={(e) => updateValidation('required', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
                Required
              </label>
            </div>
            
            {['text', 'textarea', 'email', 'password'].includes(field.type) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Length
                  </label>
                  <input
                    type="number"
                    value={field.validation.minLength || ''}
                    onChange={(e) => updateValidation('minLength', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Length
                  </label>
                  <input
                    type="number"
                    value={field.validation.maxLength || ''}
                    onChange={(e) => updateValidation('maxLength', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}
            
            {['text', 'email', 'phone'].includes(field.type) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pattern (RegExp)
                  </label>
                  <input
                    type="text"
                    value={field.validation.pattern || ''}
                    onChange={(e) => updateValidation('pattern', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pattern Error Message
                  </label>
                  <input
                    type="text"
                    value={field.validation.patternError || ''}
                    onChange={(e) => updateValidation('patternError', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};