import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordPatternCheck} from "../_validators/password-min-security.directive";
import {passwordMatchValidator} from "../_validators/passwords-match.directive";
import {ResetPasswordService} from "../_services/reset-password.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isSuccessful: boolean = false;
  message: string = "";
  wasAttempted: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private resetPasswordService: ResetPasswordService)
  {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required,
        Validators.minLength(5),
        passwordPatternCheck(/\d/, {hasNumber: true}),
        passwordPatternCheck(/[A-Z]/, {hasCapital: true}),
        passwordPatternCheck(/[a-z]/, {hasSmall: true}),
        passwordPatternCheck(/[ !@#$%^&*()_+\-={}\[\];':"|,.<>/?]/, {hasSpecial: true})]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [passwordMatchValidator]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void
  {
    let token: string | null = this.activatedRoute.snapshot.queryParamMap.get('token');

    //console.log(this.token)
    if(token != null)
      this.resetPasswordService.resetPassword(this.password?.value, this.confirmPassword?.value, token).subscribe({
        next: value => {
          this.isSuccessful = true;
          this.message = value.message;
          this.wasAttempted = true;
          console.log(value);
        },
        error: err => {
          if(err.status == 400)
          {
            this.isSuccessful = false;
            this.message = err.error.errors.errorMessage;
            this.wasAttempted = true;
          }

          else

          {

            this.router.navigate(["/error"]);
          }
        }
      });
  }

  get password()
  {

    return this.resetPasswordForm.get('password');

  }

  get confirmPassword()
  {

    return this.resetPasswordForm.get('confirmPassword');

  }
}
