/**
 * Generates a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Creates a deep clone of an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Creates a new form field at the specified index
 */
export const createFieldAtIndex = (fields: any[], field: any, index: number) => {
  return [
    ...fields.slice(0, index),
    field,
    ...fields.slice(index)
  ];
};

/**
 * Moves an item in an array from one index to another
 */
export const moveItem = <T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
};

/**
 * Formats a date for display
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

/**
 * Creates a shareable URL for a form
 */
export const createShareableUrl = (formId: string): string => {
  return `${window.location.origin}/form/${formId}`;
};