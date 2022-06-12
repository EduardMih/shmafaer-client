import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {RegisterUser} from "../_dtos/register-user.model";
import {passwordMatchValidator} from "../_validators/passwords-match.directive";
import {passwordPatternCheck} from "../_validators/password-min-security.directive";
import {Router} from "@angular/router";
import {AuthTokenService} from "../_services/auth-token.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userTypes = ["USER", "STUDENT"];
  isStudent: boolean = false;
  isSuccessful: boolean = false;
  successMessage: String = "";
  errorMessage: String = "";
  isError: boolean = false;
  registerForm: FormGroup = this.initializeForm();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private authTokenService: AuthTokenService,
              private router: Router
              ) { }

  ngOnInit(): void {
    if(this.authTokenService.isAuthenticated())
      this.router.navigate(['/'])
  }

  initializeForm(): FormGroup
  {

    return this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
                      Validators.minLength(5),
                      passwordPatternCheck(/\d/, {hasNumber: true}),
                      passwordPatternCheck(/[A-Z]/, {hasCapital: true}),
                      passwordPatternCheck(/[a-z]/, {hasSmall: true}),
                      passwordPatternCheck(/[ !@#$%^&*()_+\-={}\[\];':"|,.<>/?]/, {hasSpecial: true})]],
      confirmPassword: ['', [Validators.required]],
      roleName: this.userTypes[0],
      studentID: ['', []]
    },
      {
        validators: [passwordMatchValidator]
      });
  }

  onSubmit(): void
  {
    //console.log(this.registerForm.value);
    let newUser = new RegisterUser(this.registerForm.value.firstname,
      this.registerForm.value.lastname,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.confirmPassword,
      this.registerForm.value.roleName,
      this.registerForm.value.studentID
      )

    this.authService.register(newUser).subscribe({
      next:data => {
        this.isSuccessful = true;
        this.successMessage = `Congratulations ${data.firstname} ${data.lastname}! Your account was successfully created!`;
      },
      error: err => {
        //console.log("aici")
        console.log(err)
        if (err.status == 400)
        {
          this.isError = true;

          if('Register' in err.error.errors)
              this.errorMessage = err.error.errors['Register'];

          else

            this.errorMessage = JSON.stringify(err.error.errors)

        }

        else

        {

          this.router.navigate(['/error'])

        }
      }
    })
  }

  changeSelect(event: any)
  {
    this.isStudent = event?.target?.value == 'STUDENT';

    console.log(this.isStudent)

    if(this.isStudent)
    {
      this.registerForm.get('studentID')?.setValidators(Validators.required);
      this.registerForm.get('studentID')?.updateValueAndValidity();
    }

    else
    {

      this.registerForm.get('studentID')?.clearValidators();
      this.registerForm.get('studentID')?.updateValueAndValidity();

    }
  }

  get firstname()
  {

    return this.registerForm.get('firstname');

  }

  get lastname()
  {

    return this.registerForm.get('lastname');

  }
  get email()
  {

    return this.registerForm.get('email');

  }
  get password()
  {

    return this.registerForm.get('password');

  }

  get studentID()
  {

    return this.registerForm.get('studentID');

  }
}
