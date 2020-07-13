import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must-match.validator'; 
import { fadeInAnimation } from '../_animations/index'; 

import { AlertService, UserService, AuthenticationService } from '../_services'; 

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'], 
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class SignUpDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  )  { }

  registerForm: FormGroup; 
  submitted = false;
  hide = true;

  isOpen = true;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  }); 
  } 
  
  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // Stop here if form is invalid
      if (this.registerForm.invalid) { 
          return;
      }

      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/']);
                  console.log(`Register result: ${data}`);
              },
              error => {
                  this.alertService.error(error); 
                  console.log(`Register error: ${error}`); 
              });
  }
   
  toggle() {
    this.isOpen = !this.isOpen;
    console.log("Trigger is ", this.isOpen);
  }
  
  ngAfterViewInit() {
    document.querySelector('body').classList.add('background');
  }

  ngOnDestroy(): void {
      document.querySelector('body').classList.remove('background');
  } 

}