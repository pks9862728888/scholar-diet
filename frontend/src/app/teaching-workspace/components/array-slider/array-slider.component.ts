import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariableI } from '../../dto/VariableI';
import { ArrayInteractionService } from '../../services/array-interaction-service.service';
import { ArrayCellValueDTO } from '../../dto/ArrayCellValueDTO';
import { Subscription } from 'rxjs';
import { NameValidators } from 'src/app/form-field-validators/NameValidators';

@Component({
  selector: 'app-array-slider',
  templateUrl: './array-slider.component.html',
  styleUrls: ['./array-slider.component.css']
})
export class ArraySliderComponent implements OnInit, OnDestroy {

  // Controls for knowing the array which it is pointing to
  @Input() arrayNumber: number = 0;

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

  // Controls for controlling loop variables
  variableList: VariableI[] = [];
  addVariableForm: FormGroup;
  showAddVariableForm: boolean = false;

  // Data controls
  arrCurrCellValue: string = '';
  private arrayDataUpdateSubscription: Subscription;

  constructor(private fb: FormBuilder, private ais: ArrayInteractionService) {
    this.addVariableForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), NameValidators.validateVariableName()]]
    });

    // Subscribe to subject to get updated cell value when cell value changes
    this.arrayDataUpdateSubscription = ais.arrayDataUpdateSubject.subscribe((data: ArrayCellValueDTO) => {
      if (data.arrayNumber === this.arrayNumber && data.arrayCellIdx === this.stepIdx) {
        this.arrCurrCellValue = data.value;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.arrayDataUpdateSubscription) {
      try {
        this.arrayDataUpdateSubscription.unsubscribe();
      } catch (error) {
        console.error(error);
      }
    }
  }

  ngOnInit(): void {
    this.stepIdx = this.validStepStartIdx;
    this.updateCurrentCellValue();
  }

  getMaxSize() {
    return this.maxIdx + 1;
  }

  increment() : void {
    this.stepIdx += this.stepBy;
    this.updateCurrentCellValue();
  }

  decrement() : void {
    this.stepIdx -= this.stepBy;
    this.updateCurrentCellValue();
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

  updateCurrentCellValue(): void {
    this.arrCurrCellValue = this.ais.getArrayCellValue(this.arrayNumber, this.stepIdx);
  }
  
}
