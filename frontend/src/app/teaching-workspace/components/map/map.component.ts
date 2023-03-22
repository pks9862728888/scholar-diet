import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentTypeEnum } from '../../enums/ComponentTypeEnum';
import { AbstractWorksSpaceComponent } from '../AbstractWorkspaceComponent';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent extends AbstractWorksSpaceComponent {

  // Data store
  map: Map<string, string> = new Map<string, string>();
  getQueryValue: string | null = null;
  getOrDefaultQueryValue: string | null = null;

  // Forms for map operation
  pushForm: FormGroup;
  getForm: FormGroup;
  getOrDefaultForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super(ComponentTypeEnum.MAP);

    // Push form for map push operation
    this.pushForm = fb.group({
      key: [],
      value: []
    });

    // Get form
    this.getForm = fb.group({key: []});
    this.getOrDefaultForm = fb.group({
      key: [],
      defaultValue: [null, [Validators.required]]
    });
  }

  resetPushForm(): void {
    this.pushForm.reset();
  }

  push(): void {
    this.map.set(this.pushForm.get('key')?.value, this.pushForm.get('value')?.value);
    this.pushForm.reset();
  }

  clearMap(): void {
    this.map.clear();
  }

  getValue(): void {
    let key: string = this.getForm.get('key')?.value;
    let value: string | undefined = this.map.get(key);
    if (value) {
      this.getQueryValue = value;
    } else {
      this.getQueryValue = null;
    }
  }

  getOrDefaultValue(): void {
    let key: string = this.getOrDefaultForm.get('key')?.value;
    let defaultValue: string = this.getOrDefaultForm.get('defaultValue')?.value;
    let value: string | undefined = this.map.get(key);
    if (value) {
      this.getOrDefaultQueryValue = value;
    } else {
      this.getOrDefaultQueryValue = defaultValue;
    }
  }

}
