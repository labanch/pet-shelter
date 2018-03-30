import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PetDashboardComponent } from './pet-dashboard/pet-dashboard.component';
import { PetComponent } from './pet/pet.component';
import { NewComponent } from './pet/new/new.component';
import { EditComponent } from './pet/edit/edit.component';
import { DetailsComponent } from './pet/details/details.component';
import { PetService } from './pet.service';

@NgModule({
  declarations: [
    AppComponent,
    PetDashboardComponent,
    PetComponent,
    NewComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
