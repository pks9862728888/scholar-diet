import { Component, Input } from '@angular/core';

@Component({
  selector: 'array-cell',
  templateUrl: './array-cell.component.html',
  styleUrls: ['./array-cell.component.css']
})
export class ArrayCellComponent {

  data: string = "";
  @Input() arrayNumber: number = 0;
  @Input() currIdx: number = 0;
  @Input() maxCells: number = 0;
  @Input() maxPaddingForArrayInBothSidesInPx: number = 0;

  constructor() { }

  getArrayCellUniqueId() {
    return `array-${this.arrayNumber}-cell-${this.currIdx}`;
  }

  getMaxCellWidth() : string {
    var maxCellWidth = +Math.max(this.maxPaddingForArrayInBothSidesInPx - 1,
      Math.floor((window.innerWidth - this.maxPaddingForArrayInBothSidesInPx) / this.maxCells));
    return maxCellWidth + "px";
  }

  getTranslatedXPositionInPx(): string {
    let width = Math.floor((document.getElementById(this.getArrayCellUniqueId())?.offsetWidth || 0) 
      / 2 - this.getOffset());
    return `translateX(${width}px)`;
  }

  getOffset() : number {
    return this.maxCells > 9 ? 8 : 0;
  }
}
