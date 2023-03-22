import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachingWorkspaceComponent } from './teaching-workspace/teaching-workspace.component';

const routes: Routes = [
  { path: '', redirectTo: 'teaching-workspace', pathMatch: 'full'},
  { path: 'teaching-workspace', component: TeachingWorkspaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
