import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss']
})
export class DialogTestComponent implements OnInit {

  currentUser: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }
 
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
