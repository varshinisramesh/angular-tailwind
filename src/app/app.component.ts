import { Component, OnInit } from '@angular/core';
import { FieldGroup } from './models/field-group.model';
import { FormElement } from './models/form-element.model';
import { StorageService } from './services/storage.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  fieldGroups: FieldGroup[] = [];
  selectedGroup!: FieldGroup | null;
  selectedElement!: FormElement | null;
  optionsString: string = ''; 
  searchText: string = '';
  newGroupName: string = '';

  availableElements = [
    { type: 'text', name: 'Single Line Text' },
    { type: 'textarea', name: 'Multi Line Text' },
    { type: 'date', name: 'Date' },
    { type: 'dropdown', name: 'Dropdown' },
    { type: 'file', name: 'File Upload' },
  ];

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.fieldGroups = this.storage.load();
  }

  addGroup(name: string) {
    if (!name.trim()) {
      alert('Group name cannot be empty');
      return;
    }
    const group: FieldGroup = { id: Date.now().toString(), name, elements: [] };
    this.fieldGroups.push(group);
    this.newGroupName = ''; // Clear input
    this.save(); // If you have a save() function
  }
  

  selectGroup(group: FieldGroup) {
    this.selectedGroup = group;
    this.selectedElement = null;
  }
  addElement(elementTemplate: any) {
    if (!this.selectedGroup) {
      alert('Select a Field Group first!');
      return;
    }
  
    const newElement: FormElement = {
      id: Date.now().toString(),
      type: elementTemplate.type,
      name: elementTemplate.name,
      required: false,
    };
  
    if (newElement.type === 'dropdown' || newElement.type === 'multi-select') {
      newElement.options = [];
    }
  
    this.selectedGroup.elements.push(newElement);
    this.save();
  }
  


  selectElement(element: FormElement) {
    this.selectedElement = { ...element };
    if (element.options) {
      (this.selectedElement as any).optionsString = element.options.join(', ');
    }
  }
  

  save() {
    this.storage.save(this.fieldGroups);
  }
  downloadJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.fieldGroups));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'form-config.json');
    dlAnchor.click();
  }
  
  onFileUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fieldGroups = JSON.parse(reader.result as string);

      this.fieldGroups.forEach(group => {
        group.elements.forEach(el => {
          if ((el.type === 'dropdown' || el.type === 'multi-select') && !el.options) {
            el.options = [];
          }
        });
      });
  
      this.save();
    };
    reader.readAsText(file);
  }
  
  
  

  deleteElement(elementId: string) {
    if (this.selectedGroup) {
      this.selectedGroup.elements = this.selectedGroup.elements.filter(
        (el) => el.id !== elementId
      );
      this.selectedElement = null; // Optional: clear selection if deleted
      this.save();
    }
  }

  updateOptions() {
    if (this.selectedElement) {
      this.selectedElement.options = (this.selectedElement as any).optionsString
      ?.split(',')
      .map((opt: string) => opt.trim());    
    }
  }
  
  
  saveEditedElement() {
    if (this.selectedGroup && this.selectedElement) {
      // Handle dropdown or multi-select options if needed
      if (this.selectedElement.type === 'dropdown' || this.selectedElement.type === 'multi-select') {
        this.selectedElement.options = (this.selectedElement.optionsString || '')
          .split(',')
          .map(opt => opt.trim());
      }
  
      // Update the element in the selectedGroup
      const index = this.selectedGroup.elements.findIndex(el => el.id === this.selectedElement?.id);
      if (index !== -1) {
        this.selectedGroup.elements[index] = { ...this.selectedElement };
      }
  
      this.save();
  
      // ✅ CLOSE the edit panel
      this.selectedElement = null;
    }
  }
  


  drop(event: CdkDragDrop<FormElement[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      // Reordering within the middle pane
      moveItemInArray(this.selectedGroup!.elements, event.previousIndex, event.currentIndex);
    } else {
      // Dragging from Available (Right Pane) to Middle Pane
      const copiedElement = { ...event.previousContainer.data[event.previousIndex], id: Date.now().toString() };
      this.selectedGroup!.elements.splice(event.currentIndex, 0, copiedElement);
    }
    this.save(); // Persist the changes
    this.selectedElement = null;  
  }
 

  get filteredAvailableElements() {
    return this.availableElements.filter(element =>
      element.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  
}
