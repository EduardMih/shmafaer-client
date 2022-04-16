import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.initializeForm();

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  initializeForm(): FormGroup
  {

    return this.fb.group({
      email: '',
      password: '',
    })

  }

  onSubmit(): void
  {
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: data => {
          console.log("YEEY JWT", data)
        },
        error: err => {
          console.log("Error", err.error.message)
  }
      })
  }

}
