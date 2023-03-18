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

  increment() : void {
    this.stepIdx += this.stepBy;
    // this.validCurrStepIdx = this.stepIdx;
  }

  decrement() : void {
    this.stepIdx -= this.stepBy;
    // this.validCurrStepIdx = this.stepIdx;
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
}
