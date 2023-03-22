import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySliderComponent } from './components/array-slider/array-slider.component';
import { ArrayCellComponent } from './components/array-cell/array-cell.component';
import { ArrayComponent } from './components/array/array.component';
import { SharedModule } from '../shared/shared-module.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TeachingWorkspaceComponent } from './teaching-workspace.component';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    ArraySliderComponent,
    ArrayCellComponent,
    ArrayComponent,
    TeachingWorkspaceComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports: []
})
export class TeachingWorkspaceModule {

  constructor(private faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faTrash, faPlusCircle, faEye);
  }
}
