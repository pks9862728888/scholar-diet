import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-array-slider',
  templateUrl: './array-slider.component.html',
  styleUrls: ['./array-slider.component.css']
})
export class ArraySliderComponent implements OnInit {

  @Input() name: string = '';
  @Input() minIdx: number = 0;
  @Input() maxIdx: number = 0;
  @Input() stepBy: number = 1;
  @Input() validStepStartIdx: number = 0;
  @Input() validStepEndIdx: number = 0;
  @Input() isLoopIncrementing: boolean = true;
  stepIdx: number = 0;
  validCurrStepIdx: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.stepIdx = this.validStepStartIdx;
    this.validCurrStepIdx = this.stepIdx;
  }

  getMaxSize() {
    return this.maxIdx + 1;
  }

  updateStepIdx(currentStepIdx: number) {
    // Determine whether to rollback in case currentIdx out of valid range
    let shouldRollback: boolean = false;
    if (this.isLoopIncrementing) {
        if (this.isInValidIncrementingStepIdx(currentStepIdx)) {
          shouldRollback = true;
        }
    } else {
        if (this.isInValidDecrementingStepIdx(currentStepIdx)) {
          shouldRollback = true;
        }
    }

    // Rollback or update current valid step index
    if (shouldRollback) {
      this.stepIdx = this.validCurrStepIdx;
    } else {
      this.validCurrStepIdx = currentStepIdx;
    }
  }

  isInValidIncrementingStepIdx(currentStepIdx: number) : boolean {
    var res = !(currentStepIdx >= this.validStepStartIdx && currentStepIdx <= this.validStepEndIdx);
    console.log("Is invalid incrementing start idx: " + res + " currIdx: " + currentStepIdx);
    return res;
  }

  isInValidDecrementingStepIdx(currentStepIdx: number): boolean {
    var res = !(currentStepIdx <= this.validStepStartIdx && currentStepIdx >= this.validStepEndIdx);
    console.log("Is invalid decrementing start idx: " + res + " currIdx: " + currentStepIdx);
    return res;
  }
}
