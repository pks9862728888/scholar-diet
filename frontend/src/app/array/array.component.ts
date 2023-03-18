import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArraySliderDataInterface } from '../array-slider/ArraySliderDataInterface';
import { NumberValidators } from '../form-field-validators/NumberValidators';

interface ArrayControlI {
  maxSize: number
}

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css']
})
export class ArrayComponent {

  // Controls for controlling array size
  minIdx: number = 0;
  maxIdx: number = 0;
  maxAllowedSize: number = 40;
  cellIdxList : number[] = [];
  arraySizeForm: FormGroup;
  @Input() maxPaddingInBothSidesInPx = 0;

  // Controls for adding and deleting loops
  showLoopVariableForm: boolean = false;
  loopVariableForm: FormGroup;

  // Loop controls
  arraySliderList: ArraySliderDataInterface[] = [];

  constructor(private fb: FormBuilder) {
    this.resetArray();
    this.arraySizeForm = this.fb.group({
      maxSize: [this.maxIdx + 1, [Validators.required,
        NumberValidators.range(this.minIdx + 1, this.maxAllowedSize)]]
    });
    this.loopVariableForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      startIdx: [this.minIdx, [Validators.required, NumberValidators.range(this.minIdx, this.maxIdx + 1)]],
      endIdx: [this.maxIdx, [Validators.required, NumberValidators.range(this.minIdx, this.maxIdx + 1)]],
      stepBy: [1, [Validators.required, Validators.min(0)]],
      isLoopIncrementing: [true, [Validators.required]]
    });
    this.resetAddLoopVariableFrom();
  }

  resetAddLoopVariableFrom() {
    this.loopVariableForm.reset();
    this.loopVariableForm.patchValue({
      name: '',
      startIdx: this.minIdx,
      endIdx: this.maxIdx,
      stepBy: 1,
      isLoopIncrementing: true
    });
  }

  isLoopIncrementing() : boolean {
    return this.loopVariableForm.get('isLoopIncrementing')?.value;
  }

  resetArray(): void {
    this.minIdx = 0;
    this.maxIdx = 4;
    this.cellIdxList = [];
    for (let i = this.minIdx; i <= this.maxIdx; i++) {
      this.cellIdxList.push(i);
    }
  }

  resizeArray(): void {
    if (this.arraySizeForm.valid) {
      // Create a temp list and copy the contents from old array to new array
      let tempCellidxList: number[] = [];
      for (let i = 0; i <= this.arraySizeForm.get("maxSize")?.value - 1; i++) {
        tempCellidxList.push(i);
      }

      // Reset references
      this.maxIdx = this.arraySizeForm.get("maxSize")?.value - 1;
      this.cellIdxList = tempCellidxList;
    }
  }

  getMaxPaddingInBothSidesOfArrayInPx() {
    // 32 is added because inside this component in css 32 px padding is added
    return this.maxPaddingInBothSidesInPx + 32;
  }

  getMaxCells() : number {
    return this.maxIdx + 1;
  }

  toggleAddLoopVariableFormVisibility(): void {
    this.showLoopVariableForm = !this.showLoopVariableForm;
  }

  addLoopVariable() {
    this.arraySliderList.push({
      name: this.loopVariableForm.get('name')?.value,
      minIdx: this.minIdx,
      maxIdx: this.maxIdx,
      stepBy: this.loopVariableForm.get('stepBy')?.value,
      validStepStartIdx: this.loopVariableForm.get('startIdx')?.value,
      validStepEndIdx: this.loopVariableForm.get('endIdx')?.value,
      isLoopIncrementing: this.loopVariableForm.get('isLoopIncrementing')?.value
    });
    this.resetAddLoopVariableFrom();
    this.toggleAddLoopVariableFormVisibility();
  }
}
