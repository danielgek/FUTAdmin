import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ListProfessorsComponent } from './list';
import { FormProfessorsComponent } from './form';
import { professorsRouting } from './professors.routes';
import { ProfessorsService } from './professors.service';
import { ProfessorsComponent } from './professors.component';

import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    ProfessorsComponent,
    ListProfessorsComponent,
    FormProfessorsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    professorsRouting,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [ProfessorsService],
  bootstrap: [ProfessorsComponent]
})
export class ProfessorsModule {

}
