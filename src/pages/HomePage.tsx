import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getForms, deleteForm } from '../utils/storage';
import { Form } from '../types/form';
import { Button } from '../components/ui/Button';
import { formatDate, createShareableUrl } from '../utils/helpers';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Copy, 
  ExternalLink 
} from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  
  useEffect(() => {
    loadForms();
  }, []);
  
  const loadForms = () => {
    const storedForms = getForms();
    setForms(storedForms);
  };
  
  const handleCreateNew = () => {
    navigate('/builder');
  };
  
  const handleEdit = (formId: string) => {
    navigate(`/builder/${formId}`);
  };
  
  const handleDelete = (formId: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      deleteForm(formId);
      loadForms();
    }
  };
  
  const handleCopyLink = (formId: string) => {
    const url = createShareableUrl(formId);
    navigator.clipboard.writeText(url);
    alert(`Form link copied to clipboard: ${url}`);
  };
  
  const handleOpenForm = (formId: string) => {
    window.open(`/form/${formId}`, '_blank');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Form Builder</h1>
          <Button 
            onClick={handleCreateNew}
            leftIcon={<Plus size={16} />}
          >
            Create New Form
          </Button>
        </div>
        
        {forms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-2">No Forms Found</h2>
            <p className="text-gray-500 mb-6">Start by creating your first form!</p>
            <Button 
              onClick={handleCreateNew}
              leftIcon={<Plus size={16} />}
            >
              Create New Form
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <Card key={form.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-800 truncate">{form.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {form.steps.length} step{form.steps.length !== 1 ? 's' : ''}
                    {' • '}
                    {form.steps.reduce((total, step) => total + step.fields.length, 0)} field{form.steps.reduce((total, step) => total + step.fields.length, 0) !== 1 ? 's' : ''}
                  </p>
                </CardHeader>
                
                <CardBody className="flex-1">
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {form.description || 'No description'}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <span>Created: {formatDate(form.createdAt)}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>Last updated: {formatDate(form.updatedAt)}</span>
                    </div>
                  </div>
                </CardBody>
                
                <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(form.id)}
                      className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
                      title="Edit Form"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="p-1.5 rounded-md text-red-500 hover:bg-red-50"
                      title="Delete Form"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopyLink(form.id)}
                      className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
                      title="Copy Link"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenForm(form.id)}
                      className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50"
                      title="Open Form"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;