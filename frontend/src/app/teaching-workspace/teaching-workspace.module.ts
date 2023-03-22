import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySliderComponent } from './array-slider/array-slider.component';
import { ArrayCellComponent } from './array-cell/array-cell.component';
import { ArrayComponent } from './array/array.component';
import { SharedModule } from '../shared/shared-module.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TeachingWorkspaceComponent } from './teaching-workspace.component';


@NgModule({
  declarations: [
    ArraySliderComponent,
    ArrayCellComponent,
    ArrayComponent,
    TeachingWorkspaceComponent,
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
    faLibrary.addIcons(faTrash, faPlusCircle);
  }
}
