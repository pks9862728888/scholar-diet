import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumberValidators } from '../form-field-validators/NumberValidators';

interface ArrayControlI {
  maxSize: number
}

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css']
})
export class ArrayComponent implements OnInit{

  minIdx: number = 0;
  maxIdx: number = 0;
  maxAllowedSize: number = 40;
  cellIdxList : number[] = [];
  arraySizeForm: FormGroup;
  @Input() maxPaddingInBothSidesInPx = 0;

  constructor(private fb: FormBuilder) {
    this.resetArray();
    this.arraySizeForm = this.fb.group({
      maxSize: [this.maxIdx + 1, [Validators.required,
        NumberValidators.range(this.minIdx + 1, this.maxAllowedSize)]]
    });
  }

  ngOnInit(): void {
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
}
