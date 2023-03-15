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

  minSize: number = 0;
  maxSize: number = 0;
  maxAllowedSize: number = 40;
  cellIdxList : number[] = [];
  arraySizeForm: FormGroup;
  @Input() maxPaddingInBothSidesInPx = 0;

  constructor(private fb: FormBuilder) {
    this.resetArray();
    this.arraySizeForm = this.fb.group({
      maxSize: [this.maxSize, [Validators.required,
        NumberValidators.range(this.minSize, this.maxAllowedSize)]]
    });
  }

  ngOnInit(): void {
  }

  resetArray(): void {
    this.minSize = 1;
    this.maxSize = 5;
    this.cellIdxList = [];
    for (let i = this.minSize; i <= this.maxSize; i++) {
      this.cellIdxList.push(i - 1);
    }
  }

  resizeArray(): void {
    if (this.arraySizeForm.valid) {
      // Create a temp list and copy the contents from old array to new array
      let tempCellidxList: number[] = [];
      for (let i = 1; i <= this.arraySizeForm.get("maxSize")?.value; i++) {
        tempCellidxList.push(i - 1);
      }

      // Reset references
      this.maxSize = this.arraySizeForm.get("maxSize")?.value;
      this.cellIdxList = tempCellidxList;
    }
  }

  getMaxPaddingInBothSidesOfArrayInPx() {
    // 32 is added because inside this component in css 32 rem is added
    return this.maxPaddingInBothSidesInPx + 32;
  }
}
