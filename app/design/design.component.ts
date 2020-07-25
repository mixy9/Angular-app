import { Component, OnInit, ViewChild } from '@angular/core';
import { AddItemComponent } from 'src/app/add-item/add-item.component';
import { EmployeeService } from '../_services/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/Employee';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_services';
import {
  MatSnackBar,
  MatDialog
} from '@angular/material';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  table: boolean = true;
  userr: User[];

  _listFilterBy: string;
  filteredList: Employee[];

  allEmployees: Employee[];
  selectedValue: string;

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.userr = users;
      console.log(this.userr, 'USERS');
    });

    this.allEmployees = this.employeeService.getAllEmployees();
    this.filteredList = this.allEmployees;
    this._listFilterBy = "";
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.userr = users;
    });
  }

  showTable() {
    this.table = !this.table;
  }

  openDialog() {
    this.dialog.open(AddItemComponent);
  }

  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 2000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed.');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
    });
  }

  // Gets filter by value from the search box
  get listFilterBy(): string {
    return this._listFilterBy;
  }

  // Sets filter by value from the search box
  set listFilterBy(value: string) {
    this._listFilterBy = value;
    this.filteredList = this._listFilterBy ? this.performFilter(this._listFilterBy) : this.allEmployees;
  }

  // Method to filter the employees on basis of filter by value
  performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allEmployees.filter((employee: Employee) => employee.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      employee.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  addEmployee() {
    this.router.navigate(['/add']);
  }

  refreshList() {
    this.allEmployees = this.employeeService.getAllEmployees();
    this.filteredList = this.allEmployees;
  }
}

