import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AddItemComponent } from 'src/app/add-item/add-item.component'; 
import { EmployeeService } from '../_services/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/Employee'; 
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_services';

import { 
  MatSnackBar, 
  MatDialog,
  MatTableDataSource,
  MatSort 
} from  '@angular/material';  

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {  

  constructor
  (
    private snackBar: MatSnackBar, 
    public dialog: MatDialog, 
    private userService: UserService,
    private employeeService: EmployeeService, 
    private router: Router
  ) { }

  clickCounter: number = 0;
  search: string = '';  
  loading = false; 
  users: User[]; 

  selectedValue: string; 

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  countClick() {
    this.clickCounter += 1;
  }

  setClasses() {
    let myClasses = {
      active: this.clickCounter > 4,
      notactive: this.clickCounter <= 4
    };
    return myClasses;
  } 

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });
    
    this.allEmployees = this.employeeService.getAllEmployees();
    this.filteredList = this.allEmployees;
    this._listFilterBy = "";
  }
  
  openDialog() {
    this.dialog.open(AddItemComponent);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message, action) {

    // snack bar se može zatvoriti na gumb ručno ili automatski nakon  sekunde
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed.');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
    });
  } 
 
  deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllUsers()
      });
  }

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
      });
  }

  _listFilterBy: string;
  allEmployees: Employee[];
  filteredList: Employee[];  

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

  // Method to add an employee to the list
  addEmployee(){
    this.router.navigate(['/add']);
  }

  // Method to refresh the employee list after successful delete
  refreshList(){
    this.allEmployees = this.employeeService.getAllEmployees();
    this.filteredList = this.allEmployees;
  }
}

