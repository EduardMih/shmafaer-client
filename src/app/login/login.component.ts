import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {AuthTokenService} from "../_services/auth-token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.initializeForm();
  isSuccessful: boolean = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private authTokenService: AuthTokenService
  ) { }

  ngOnInit(): void {
    if(this.authTokenService.isAuthenticated())
      this.router.navigate(['/'])
  }

  initializeForm(): FormGroup
  {

    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    })

  }

  onSubmit(): void
  {
    //console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: data => {
          console.log(data.jwtToken)
          this.authTokenService.saveUserData(data)

          this.router.navigate(["/home"])
        },
        error: err => {
          //console.log(err)
          if((err.status == 401) && ((err.error.Error == "Bad credentials") || (err.error.Error == "Email was not confirmed")))
            this.isSuccessful = false;

          else

              this.router.navigate(['error']);

  }
      })
  }

  get email()
  {

    return this.loginForm.get('email');

  }

  get password()
  {

    return this.loginForm.get('password');

  }
}
