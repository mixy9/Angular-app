import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ForecastComponent } from './forecast/forecast.component'; 
import { DesignComponent } from './design/design.component';
import { SignUpDialogComponent } from './sign-up-dialog/sign-up-dialog.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { AddItemComponent } from './add-item/add-item.component'; 


const routes: Routes = [
  { path: '', component: HomeComponent },              
  { path: 'forecast', component: ForecastComponent },                
  { path: 'design', component: DesignComponent },              
  { path: 'reg', component: SignUpDialogComponent },              
  { path: 'eployeeDetail', component: EmployeedetailComponent },              
  { path: 'editEmployee/:id', component: EditemployeeComponent },              
  { path: 'add', component: AddItemComponent },     

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
