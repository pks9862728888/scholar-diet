import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-array-slider',
  templateUrl: './array-slider.component.html',
  styleUrls: ['./array-slider.component.css']
})
export class ArraySliderComponent implements OnInit, OnChanges {

  @Input() minIdx: number = 0;
  @Input() maxIdx: number = 0;
  stepIdx: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getMaxSize() {
    return this.maxIdx + 1;
  }

}
