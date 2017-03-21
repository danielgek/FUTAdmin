import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ListDisciplinesComponent } from './list';
import { disciplinesRouting } from './disciplines.routes';
import { DisciplinesComponent } from './disciplines.component';
import { StudentsService } from '../students/students.service';
import { ProfessorsService } from '../professors/professors.service';
import { ClassesService } from './classes/classes.service';

import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ListClassesComponent } from './classes/list/list-classes.component';
import { FormClassesComponent } from './classes/form/form-classes.component';

@NgModule({
  declarations: [
    DisciplinesComponent,
    ListDisciplinesComponent,
    ListClassesComponent,
    FormClassesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    disciplinesRouting,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [ClassesService, ProfessorsService, StudentsService],
  bootstrap: [DisciplinesComponent]
})
export class DisciplinessModule {

}
