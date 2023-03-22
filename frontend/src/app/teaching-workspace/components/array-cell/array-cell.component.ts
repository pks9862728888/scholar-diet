import { Component, Input } from '@angular/core';
import { ArrayInteractionService } from '../../services/array-interaction-service.service';

@Component({
  selector: 'array-cell',
  templateUrl: './array-cell.component.html',
  styleUrls: ['./array-cell.component.css']
})
export class ArrayCellComponent {

  data: string = "";
  @Input() arrayNumber: number = 0;
  @Input() currIdx: number = 0;  // Index of current cell
  @Input() maxCells: number = 0;
  @Input() maxPaddingForArrayInBothSidesInPx: number = 0;

  constructor(private ais: ArrayInteractionService) { }

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
    return this.currIdx > 9 ? 8 : 4;
  }

  sendArrayCellValueUpdateEvent(data: string): void {
    this.ais.sendArrayCellValueUpdateEvent({
      arrayNumber: this.arrayNumber,
      arrayCellIdx: this.currIdx,
      value: data
    });
  }
}
