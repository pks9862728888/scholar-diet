import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArrayCellValueDTO } from '../dto/ArrayCellValueDTO';

@Injectable({
  providedIn: 'root'
})
export class ArrayInteractionService {

  // M<K1, M2<K2, V2>> where K1 = componentRef, K2 = cellIdx, V2 = value 
  private arrayDataMap : Map<string, Map<number, string>> = 
    new Map<string, Map<number, string>>();
  arrayDataUpdateSubject : Subject<ArrayCellValueDTO> = new Subject<ArrayCellValueDTO>();

  sendArrayCellValueUpdateEvent(data: ArrayCellValueDTO) {
    // Update local map with data
    if (!this.arrayDataMap.has(data.componentRef)) {
      this.arrayDataMap.set(data.componentRef, new Map<number, string>());
    }
    this.arrayDataMap.get(data.componentRef)?.set(data.arrayCellIdx, data.value);

    // Send data update to all subscribers
    this.arrayDataUpdateSubject.next(data);
  }

  getArrayCellValue(componentRef: string, arrayCellIdx: number) : string {
    let value: string | undefined = this.arrayDataMap.get(componentRef)?.get(arrayCellIdx);
    return value ? value : ``;
  }

  removeArrayDeletedCellValues(componentRef: string, newResizedMaxCellIdx: number): void {
    if (this.arrayDataMap.has(componentRef)) {
      // Delete all the cell values which do not exist
      for (let [key, value] of this.arrayDataMap.get(componentRef)!) {
        if (+key > newResizedMaxCellIdx) {
          this.arrayDataMap.get(componentRef)?.delete(+key);
        }
      }
    }
  }
}
