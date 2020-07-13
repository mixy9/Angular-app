import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator'; 
import { UserService } from "../_services/user.service";

import { Router } from '@angular/router';
import { EmployeeService } from '../_services/employeeservice.service'; 
import { Employee } from '../_models/Employee';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup; 

  employee: Employee; 

  constructor
  ( private _formBuilder: FormBuilder, 
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  firstname: string;
  lastname: string;
  age: number;
  designation: string;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({ 
      age: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({ 
      designation: ['', Validators.required]
    }); 
  }

  get f() { return this.firstFormGroup.controls; }

  // Method to save an employee
  saveEmployee(){
    this.employee = new Employee(this.makeRandomID(), this.firstname, this.lastname, this.age, this.designation);
    this.employeeService.addEmployee(this.employee);
    this.router.navigate(["/design"]);
  } 

  // Creates random id for employee
  makeRandomID(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}