import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { ListStudentsComponent } from './list';
import { FormStudentsComponent } from './form';
import { ListPaymentsComponent } from './payments/list';
import { studentRouting } from './students.routes';
import { StudentsService } from './students.service';
import { StudentsComponent } from './students.component';

import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


@NgModule({
  declarations: [
    StudentsComponent,
    ListStudentsComponent,
    FormStudentsComponent,
    ListPaymentsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    studentRouting,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [StudentsService],
  bootstrap: [StudentsComponent]
})
export class StudentsModule {

}

