import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'array-cell',
  templateUrl: './array-cell.component.html',
  styleUrls: ['./array-cell.component.css']
})
export class ArrayCellComponent implements OnInit {

  data: string = "";
  @Input() currIdx: number = 0;
  @Input() maxCells: number = 0;
  @Input() maxPaddingForArrayInBothSidesInPx: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getMaxCellWidth() : string {
    var maxCellWidth = +Math.max(this.maxPaddingForArrayInBothSidesInPx - 1,
      Math.floor((window.innerWidth - this.maxPaddingForArrayInBothSidesInPx) / this.maxCells));
    return maxCellWidth + "px";
  }
}
