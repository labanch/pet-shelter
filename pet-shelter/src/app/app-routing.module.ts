import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetDashboardComponent } from './pet-dashboard/pet-dashboard.component';
import { NewComponent } from './pet/new/new.component';
import { EditComponent } from './pet/edit/edit.component';
import { DetailsComponent } from './pet/details/details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PetDashboardComponent },
  { path: 'new', component: NewComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
