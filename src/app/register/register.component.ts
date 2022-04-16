import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {RegisterUser} from "../_models/register-user.model";
import {passwordMatchValidator} from "../_validators/passwords-match.directive";
import {passwordPatternCheck} from "../_validators/password-min-security.directive";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userTypes = ["STUDENT", "PROFESSOR", "USER"]
  registerForm: FormGroup = this.initializeForm();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {

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
      roleName: this.userTypes[0]
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
      Array.of(this.registerForm.value.roleName)
      )

    this.authService.register(newUser).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log("error" + err.error.message)
      }

    })
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




}
