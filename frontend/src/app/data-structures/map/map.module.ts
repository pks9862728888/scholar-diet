import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {

  constructor(private faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faTrash, faPlusCircle, faEye);
  }
  
}
