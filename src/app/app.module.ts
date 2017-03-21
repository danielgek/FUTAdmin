import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {MaterialModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { StudentsModule} from './students';
import { ProfessorsModule } from './professors';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ReportComponent } from './report';
import { DisciplinessModule } from './disciplines';

import { routing, authProviders } from './app.routes';

export const firebaseConfig = {
    apiKey: 'AIzaSyDSJdzAWs7cWF9nIYOOhgHWTyDinzdkV1Q',
    authDomain: 'fut-admin.firebaseapp.com',
    databaseURL: 'https://fut-admin.firebaseio.com',
    storageBucket: 'fut-admin.appspot.com',
    messagingSenderId: '688333201834'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    StudentsModule,
    ProfessorsModule,
    DisciplinessModule
  ],
  providers: [authProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
