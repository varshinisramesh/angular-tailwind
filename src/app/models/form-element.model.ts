export interface FormElement {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: string[]; 
  optionsString?: string;
} 
