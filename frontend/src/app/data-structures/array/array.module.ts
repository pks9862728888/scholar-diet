import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayComponent } from './array.component';
import { ArraySliderComponent } from './array-slider/array-slider.component';
import { ArrayCellComponent } from './array-cell/array-cell.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    ArrayComponent,
    ArraySliderComponent,
    ArrayCellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports: [
    ArrayComponent
  ]
})
export class ArrayModule { 

  constructor(private faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faTrash, faPlusCircle, faEye);
  }
}
