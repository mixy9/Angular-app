import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators'; 

import { AlertService, AuthenticationService } from '../_services'; 

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit { 

  loginForm: FormGroup;
  returnUrl: string;

  submitted = false;
  hide = true;

  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {

    // Redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/design']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/design';
  }
 
  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          console.log(`Login result: ${data}`);
        },
        error => {
          this.alertService.error(error);
          this.error = error;
          console.log(`Login error: ${error}`);
        });
  }  
  
  ngAfterViewInit() {
    document.querySelector('body').classList.add('background');
  }

  ngOnDestroy(): void {
      document.querySelector('body').classList.remove('background');
  } 

}
