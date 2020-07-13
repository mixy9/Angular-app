import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/Employee';


@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./employeedetail.component.scss']
})
export class EmployeedetailComponent{

  // Service injected in constructor
  constructor(private employeeService: EmployeeService, private router: Router) { 
  } 

  // Input variable to display properties of an employee
  @Input() employee: Employee;

  // Output variable used to tell the parent component to refesh the employee list after successful delete
  @Output() refreshEmployeeList: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Method to edit employee details
  editEmployee(){
    this.router.navigate(['/editEmployee'+ this.employee.id]);
  }
  
  // Method to delete an employee
  deleteEmployee(employeeToBeDeleted: Employee){
    var result = confirm("Are you sure, you want to delete this Employee?");
    if (result) {
      this.employeeService.deleteEmployee(this.employee.id);
      this.refreshEmployeeList.emit(true);
      this.router.navigate(['/design']);
    } 
  } 
}