import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {RegisterUser} from "../_models/register-user.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userTypes = ["STUDENT", "PROFESSOR", "USER"]
  registerForm: FormGroup = this.initializeForm();

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

  }

  initializeForm(): FormGroup
  {

    return this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      roleName: this.userTypes[0]
    })

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
}
