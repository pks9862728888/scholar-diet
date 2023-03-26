import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeachingWorkspaceModule } from './workspaces/teaching-workspace/teaching-workspace.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TeachingWorkspaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
