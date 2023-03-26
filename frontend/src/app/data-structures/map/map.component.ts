import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameValidators } from 'src/app/validators/form-field-validators/NameValidators';
import { VariableI } from 'src/app/shared/dto/VariableI';
import { ComponentTypeEnum } from 'src/app/workspaces/teaching-workspace/enums/ComponentTypeEnum';
import { AbstractWorksSpaceComponent } from '../../workspaces/AbstractWorkspaceComponent';


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
  variableList: VariableI[] = [];

  // Forms for map operation
  pushForm: FormGroup;
  getForm: FormGroup;
  getOrDefaultForm: FormGroup;
  addVariableForm: FormGroup;

  // Form controls
  showAddVariableForm = false;

  constructor(private fb: FormBuilder) {
    super(ComponentTypeEnum.MAP);

    // Push form for map push operation
    this.pushForm = fb.group({
      key: [],
      value: []
    });

    // Get operations form
    this.getForm = fb.group({key: []});
    this.getOrDefaultForm = fb.group({
      key: [],
      defaultValue: [null, [Validators.required]]
    });

    this.addVariableForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), NameValidators.validateVariableName()]]
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

  addVariable() : void {
    let variableName : string = this.addVariableForm.get('name')?.value;
    if (this.variableList.filter(v => v.name === variableName).length > 0) {
      // Show validation error
      this.addVariableForm.get('name')?.setErrors(
        { 'duplicateVariableName' : 'Another variable exists with same variable name: ' + 
          variableName }
      );
    } else {
      // Add the variable to local variable list
      this.variableList.push({
        name: variableName,
        value: ''
      });
      this.showAddVariableForm = false;
      this.addVariableForm.reset();
    }
  }

  deleteVariable(variable: VariableI) : void{
    this.variableList = this.variableList.filter(v => v.name !== variable.name);
  }
}
