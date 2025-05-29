import React, { useRef } from 'react';
import { FormField as FormFieldType } from '../../types/form';
import { FormField } from '../FormFields';
import { Card } from '../ui/Card';
import { Move } from 'lucide-react';

interface BuilderCanvasProps {
  fields: FormFieldType[];
  selectedFieldId: string | null;
  onSelectField: (fieldId: string) => void;
  onMoveField: (fromIndex: number, toIndex: number) => void;
  onSetDragging: (isDragging: boolean) => void;
  stepTitle: string;
  onUpdateStepTitle: (title: string) => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
  onMoveField,
  onSetDragging,
  stepTitle,
  onUpdateStepTitle
}) => {
  const draggedItem = useRef<number | null>(null);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    draggedItem.current = index;
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    
    // Add a delay to set dragging state to true
    setTimeout(() => {
      onSetDragging(true);
    }, 0);
  };
  
  const handleDragEnd = () => {
    draggedItem.current = null;
    onSetDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    
    const fromIndex = draggedItem.current;
    
    if (fromIndex !== null && fromIndex !== index) {
      onMoveField(fromIndex, index);
    }
    
    onSetDragging(false);
  };
  
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-6">
        <input
          type="text"
          value={stepTitle}
          onChange={(e) => onUpdateStepTitle(e.target.value)}
          className="text-xl font-semibold w-full border-none p-0 focus:outline-none focus:ring-0"
          placeholder="Step Title"
        />
      </div>
      
      {fields.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Drag and drop fields from the sidebar to start building your form
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="relative"
            >
              <Card
                className={`
                  p-4 relative transition-all
                  ${selectedFieldId === field.id ? 'ring-2 ring-blue-500' : ''}
                  hover:shadow-md
                `}
                onClick={() => onSelectField(field.id)}
              >
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 cursor-move p-1 bg-white rounded-full shadow border border-gray-200">
                  <Move size={16} className="text-gray-500" />
                </div>
                <FormField 
                  field={field} 
                  value={field.defaultValue || ''} 
                  onChange={() => {}} 
                  isBuilder={true}
                />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};