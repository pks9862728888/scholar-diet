import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArrayCellValueDTO } from '../dto/ArrayCellValueDTO';

@Injectable({
  providedIn: 'root'
})
export class ArrayInteractionService {

  // M<K1, M2<K2, V2>> where K1 = arrayNumber, K2 = cellIdx, V2 = value 
  private arrayDataMap : Map<number, Map<number, string>> = 
    new Map<number, Map<number, string>>();
  arrayDataUpdateSubject : Subject<ArrayCellValueDTO> = new Subject<ArrayCellValueDTO>();

  constructor() { }

  sendArrayCellValueUpdateEvent(data: ArrayCellValueDTO) {
    // Update local map with data
    if (!this.arrayDataMap.has(data.arrayNumber)) {
      this.arrayDataMap.set(data.arrayNumber, new Map<number, string>());
    }
    this.arrayDataMap.get(data.arrayNumber)?.set(data.arrayCellIdx, data.value);

    // Send data update to all subscribers
    this.arrayDataUpdateSubject.next(data);
  }

  getArrayCellValue(arrayNumber: number, arrayCellIdx: number) : string {
    let value: string | undefined = this.arrayDataMap.get(arrayNumber)?.get(arrayCellIdx);
    return value ? value : ``;
  }

  removeArrayDeletedCellValues(arrayNumber: number, newResizedMaxCellIdx: number): void {
    if (this.arrayDataMap.has(arrayNumber)) {
      // Delete all the cell values which do not exist
      for (let [key, value] of this.arrayDataMap.get(arrayNumber)!) {
        if (+key > newResizedMaxCellIdx) {
          this.arrayDataMap.get(arrayNumber)?.delete(+key);
        }
      }
    }
  }
}
