import { Injectable } from '@angular/core';
import { FieldGroup } from '../models/field-group.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private key = 'form-builder-data';

  save(groups: FieldGroup[]) {
    localStorage.setItem(this.key, JSON.stringify(groups));
  }

  load(): FieldGroup[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }
}
