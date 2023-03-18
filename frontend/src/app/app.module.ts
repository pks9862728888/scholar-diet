import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrayCellComponent } from './array-cell/array-cell.component';
import { ArrayComponent } from './array/array.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArraySliderComponent } from './array-slider/array-slider.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    ArrayCellComponent,
    ArrayComponent,
    NavbarComponent,
    ArraySliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faTrash, faPlusCircle);
  }
}
