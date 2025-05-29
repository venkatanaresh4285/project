import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FieldType } from '../../types/form';
import { 
  Type, 
  AlignLeft, 
  List, 
  CheckSquare, 
  Calendar, 
  Hash, 
  Mail, 
  Phone, 
  Lock,
  Radio
} from 'lucide-react';

interface BuilderSidebarProps {
  onAddField: (type: FieldType) => void;
  onLoadTemplate: (templateName: string) => void;
}

interface FieldOption {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({
  onAddField,
  onLoadTemplate
}) => {
  const fieldOptions: FieldOption[] = [
    { type: 'text', label: 'Text', icon: <Type size={18} /> },
    { type: 'textarea', label: 'Textarea', icon: <AlignLeft size={18} /> },
    { type: 'dropdown', label: 'Dropdown', icon: <List size={18} /> },
    { type: 'checkbox', label: 'Checkbox', icon: <CheckSquare size={18} /> },
    { type: 'radio', label: 'Radio', icon: <Radio size={18} /> },
    { type: 'date', label: 'Date', icon: <Calendar size={18} /> },
    { type: 'number', label: 'Number', icon: <Hash size={18} /> },
    { type: 'email', label: 'Email', icon: <Mail size={18} /> },
    { type: 'phone', label: 'Phone', icon: <Phone size={18} /> },
    { type: 'password', label: 'Password', icon: <Lock size={18} /> }
  ];
  
  return (
    <div className="bg-gray-50 border-r border-gray-200 p-4 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Form Fields</h2>
        <div className="grid grid-cols-2 gap-2">
          {fieldOptions.map((field) => (
            <Card 
              key={field.type}
              className="flex flex-col items-center justify-center p-3 hover:bg-blue-50 transition-colors cursor-pointer"
              onClick={() => onAddField(field.type)}
              hoverEffect={true}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mb-2">
                {field.icon}
              </div>
              <span className="text-sm">{field.label}</span>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Templates</h2>
        <div className="space-y-2">
          <Button 
            variant="outline"
            isFullWidth
            onClick={() => onLoadTemplate('contactForm')}
          >
            Contact Form
          </Button>
          <Button
            variant="outline"
            isFullWidth
            onClick={() => onLoadTemplate('surveyForm')}
          >
            Survey Form
          </Button>
        </div>
      </div>
    </div>
  );
};