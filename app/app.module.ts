import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { ForecastComponent } from './forecast/forecast.component';
import { DesignComponent } from './design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { SignUpDialogComponent } from './sign-up-dialog/sign-up-dialog.component';
import { AddItemComponent } from './add-item/add-item.component';
import { fakeBackendProvider, JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './_components';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForecastComponent,
    DesignComponent,
    DialogTestComponent,
    SignUpDialogComponent,
    AddItemComponent,
    AlertComponent,
    EmployeedetailComponent,
    EditemployeeComponent,
    SignInComponent
  ],
  entryComponents: [DialogTestComponent, SignUpDialogComponent, AddItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    //  ApixuService, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  // Identifies the root component that Angular should bootstrap when it starts the application.
  bootstrap: [AppComponent]
})
export class AppModule { }
