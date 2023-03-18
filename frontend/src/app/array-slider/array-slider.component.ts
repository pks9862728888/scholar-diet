import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameValidators } from '../form-field-validators/NameValidators';
import { VariableI } from './VariableI';

@Component({
  selector: 'app-array-slider',
  templateUrl: './array-slider.component.html',
  styleUrls: ['./array-slider.component.css']
})
export class ArraySliderComponent implements OnInit {

  // Controls for controlling slider
  @Input() name: string = '';
  @Input() minIdx: number = 0;
  @Input() maxIdx: number = 0;
  @Input() stepBy: number = 1;
  @Input() validStepStartIdx: number = 0;
  @Input() validStepEndIdx: number = 0;
  @Input() isLoopIncrementing: boolean = true;
  stepIdx: number = 0;
  @Output() deleteSliderEventEmitter : EventEmitter<void> = new EventEmitter<void>;

  // Controls for controlling tracking variables
  variableList: VariableI[] = [];
  addVariableForm: FormGroup;
  showAddVariableForm: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addVariableForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), NameValidators.validateVariableName()]]
    })
  }

  ngOnInit(): void {
    this.stepIdx = this.validStepStartIdx;
  }

  getMaxSize() {
    return this.maxIdx + 1;
  }

  increment() : void {
    this.stepIdx += this.stepBy;
  }

  decrement() : void {
    this.stepIdx -= this.stepBy;
  }

  isOutOfBounds(isButtonIncrementing: boolean) : boolean {
    return isButtonIncrementing ? this.stepIdx > this.validStepEndIdx :
      this.stepIdx < this.validStepStartIdx;
  }

  isLoopIndexOutOfBounds() : boolean {
    return this.isLoopIncrementing ? this.isInValidIncrementingStepIdx(this.stepIdx) :
      this.isInValidDecrementingStepIdx(this.stepIdx);
  }

  isInValidIncrementingStepIdx(currentStepIdx: number) : boolean {
    var res = !(currentStepIdx >= this.validStepStartIdx && currentStepIdx <= this.validStepEndIdx);
    return res;
  }

  isInValidDecrementingStepIdx(currentStepIdx: number): boolean {
    var res = !(currentStepIdx <= this.validStepStartIdx && currentStepIdx >= this.validStepEndIdx);
    return res;
  }

  deleteSlider() : void {
    this.deleteSliderEventEmitter.emit();
  }

  showAddTrackingVariableFrom() : void {
    this.showAddVariableForm = true;
  }

  hideAddLocalVariableFrom() : void {
    this.showAddVariableForm = false;
    this.addVariableForm.reset();
  }

  addLoopVariable() : void {
    let variableName : string = this.addVariableForm.get('name')?.value;
    if (this.variableList.filter(v => v.name === variableName).length > 0 || 
      this.name === variableName) {
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
      console.log(this.variableList);
      this.hideAddLocalVariableFrom();
      this.addVariableForm.reset();
    }
  }

  deleteVariable(variable: VariableI) {
    let idx = this.variableList.findIndex(v => v.name === variable.name);
    if (idx !== -1) {
      this.variableList.splice(idx, 1);
    }
  }
}
