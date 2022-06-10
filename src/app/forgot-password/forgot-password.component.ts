import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResetPasswordService} from "../_services/reset-password.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isSuccessful: boolean = false;
  wasAttempted: boolean = false;
  message: string = "";

  constructor(private fb: FormBuilder,
              private resetPasswordService: ResetPasswordService,
              private router: Router)
  {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit()
  {

    console.log(this.email?.value)
    this.resetPasswordService.sendResetRequest(this.email?.value).subscribe({
        next: value => {
          this.message = value.message;
          this.isSuccessful = true;
          this.wasAttempted = true;
        },
        error: err => {
          if (err.status == 400)
          {
            this.isSuccessful = false;
            this.message = err.error.errors.errorMessage;
            this.wasAttempted = true;
          } else {

            this.router.navigate(["/error"]);

          }

        }
      }
    );


  }

  get email()
  {

    return this.resetPasswordForm.get('email');

  }

}
