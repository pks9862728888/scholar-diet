import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TeachingWorkspaceComponent } from './teaching-workspace.component';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { CodeComponent } from './components/code/code.component';
import { ArrayModule } from '../../data-structures/array/array.module';
import { MapModule } from '../../data-structures/map/map.module';


@NgModule({
  declarations: [
    TeachingWorkspaceComponent,
    CodeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ArrayModule,
    MapModule
  ],
  exports: []
})
export class TeachingWorkspaceModule {

  constructor(private faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faTrash, faPlusCircle, faEye);
  }
}
