import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArraySliderDataInterface } from '../dto/ArraySliderDataInterface';
import { NameValidators } from '../../form-field-validators/NameValidators';
import { NumberValidators } from '../../form-field-validators/NumberValidators';
import { ArrayInteractionService } from '../services/array-interaction-service.service';

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
  maxAllowedSize: number = 20;
  cellIdxList : number[] = [];
  arraySizeForm: FormGroup;
  @Input() maxPaddingInBothSidesInPx = 0;

  // Contols for managing multiple arrays
  arrayNumber = 0;

  // Controls for adding and deleting loops
  showLoopVariableForm: boolean = false;
  loopVariableForm: FormGroup;

  // Loop controls
  arraySliderList: ArraySliderDataInterface[] = [];

  constructor(private fb: FormBuilder, private ais: ArrayInteractionService) {
    this.initArrayWithDefaultValues();
    this.arraySizeForm = this.fb.group({
      maxSize: [this.maxIdx + 1, [Validators.required,
        NumberValidators.range(this.minIdx + 1, this.maxAllowedSize)]]
    });
    this.loopVariableForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), NameValidators.validateVariableName()]],
      startIdx: [this.minIdx, [Validators.required, NumberValidators.range(this.minIdx, this.maxIdx)]],
      endIdx: [this.maxIdx, [Validators.required, NumberValidators.range(this.minIdx, this.maxIdx)]],
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

  initArrayWithDefaultValues(): void {
    this.minIdx = 0;
    this.maxIdx = 4;
    this.cellIdxList = [];
    for (let i = this.minIdx; i <= this.maxIdx; i++) {
      this.cellIdxList.push(i);
    }
  }

  resizeArray(): void {
    if (this.arraySizeForm.valid) {
      let newSize = this.arraySizeForm.get("maxSize")?.value;
      let oldSize = this.getArraySize();

      // Create a temp list and copy the contents from old array to new array
      let tempCellIdxList: number[] = [];
      for (let i = 0; i <= newSize - 1; i++) {
        tempCellIdxList.push(i);
      }

      // Reset references
      this.maxIdx = newSize - 1;
      this.cellIdxList = tempCellIdxList;

      // Update add loop variable form with updated value and validator
      this.loopVariableForm.patchValue({
        'endIdx': [newSize]
      });
      let endIdxFormControl = this.loopVariableForm.get('endIdx');
      endIdxFormControl?.clearValidators();
      endIdxFormControl?.addValidators(Validators.required);
      endIdxFormControl?.addValidators(NumberValidators.range(this.minIdx, this.maxIdx + 1));

      // If newSize is > old size then update max value of slider to new size, 
      // else clear all sliders (loop variables)
      if (newSize > oldSize) {
        for (let slider of this.arraySliderList) {
          slider.maxIdx = newSize - 1;
        }
      } else if (newSize < oldSize) {
        this.arraySliderList = [];
        this.ais.removeArrayDeletedCellValues(this.arrayNumber, this.maxIdx);
      }
    }
  }

  getMaxPaddingInBothSidesOfArrayInPx() {
    // 32 is added because inside this component in css 1 rem (both side) + 0.5 rem (both side) 
    // padding is added
    return this.maxPaddingInBothSidesInPx + 32 + 16;
  }

  addLoopVariable() {
    // Validate if loop variable is not duplicate
    let loopVarName : string = this.loopVariableForm.get('name')?.value;
    if (this.arraySliderList.findIndex(s => s.name === loopVarName) != -1) {
      this.loopVariableForm.get('name')?.setErrors(
        { 'duplicateVariableName' : 'Another loop exists with same variable name: ' + loopVarName });
    } else {
      // Not duplicate, so add arraySlider
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
      this.hideLoopVariableForm();
    }
  }

  deleteSlider(slider: ArraySliderDataInterface) : void {
    let idxToDelete: number = this.arraySliderList.indexOf(slider);
    if (idxToDelete != -1) {
      this.arraySliderList.splice(idxToDelete, 1);
    }
  }

  isLoopIncrementing() : boolean {
    return this.loopVariableForm.get('isLoopIncrementing')?.value;
  }

  isArraySizeSame(): boolean {
    return this.arraySizeForm.get("maxSize")?.value == this.getArraySize();
  }

  getArraySize() : number {
    return this.maxIdx + 1;
  }

  makeLoopVarFormVisible(): void {
    this.showLoopVariableForm = true;
  }

  hideLoopVariableForm(): void {
    this.showLoopVariableForm = false;
    this.resetAddLoopVariableFrom();
  }

  getUniqueArrayId() : string {
    return `array-id-${this.arrayNumber}`;
  }
}
