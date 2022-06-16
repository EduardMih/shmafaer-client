import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordPatternCheck} from "../_validators/password-min-security.directive";
import {passwordMatchValidator} from "../_validators/passwords-match.directive";
import {AuthTokenService} from "../_services/auth-token.service";
import {UserDetails} from "../_dtos/user-details.model";
import {Router} from "@angular/router";
import {UserUpdateInfo} from "../_utils/user-update-info.model";
import {UpdatePassword} from "../_utils/update-password.model";
import {ProfileService} from "../_services/profile.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isSuccessful: boolean = false;
  successMessage: String = "";
  errorMessage: String = "";
  isError: boolean = false;
  userInfoForm: FormGroup = this.buildUserInfoForm();
  passwordChangeForm: FormGroup = this.buildPasswordChangeForm();
  currentUserData?: UserDetails;

  constructor(private fb: FormBuilder,
              private authTokenService: AuthTokenService,
              private router: Router,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.currentUserData = this.getUserData();
    this.setInitialFormValues();
  }

  buildUserInfoForm(): FormGroup
  {

    return this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });

  }

  buildPasswordChangeForm(): FormGroup
  {

    return this.fb.group({
        oldPassword: ['', Validators.required],
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
      })
  }

  getUserData(): UserDetails
  {
    let userData = this.authTokenService.getUserData();

    if(userData == null)
    {
      this.authTokenService.logout();
      this.router.navigate(['/login']);
    }

    return userData!;

  }

  setInitialFormValues(): void
  {
    this.firstname?.setValue(this.currentUserData?.firstname);
    this.lastname?.setValue(this.currentUserData?.lastname);
    this.email?.setValue(this.currentUserData?.email);
  }

  onSubmitUserInfo(): void
  {
    let userUpdateInfo: UserUpdateInfo = {
      firstname: this.firstname?.value,
      lastname: this.lastname?.value,
      email: this.email?.value
    }
    console.log("Submit")
    console.log(userUpdateInfo);

    this.profileService.updateUserInfo(userUpdateInfo).subscribe({
      next: value => {
        this.authTokenService.logout();
        this.router.navigate(['/login'])
      },
      error: err => {
        this.isError = true;
        this.errorMessage = err.error.errors.errorMessage;
        console.log(err)
      }
    })

  }

  onSubmitChangePass(): void
  {
    let updatePasswordInfo: UpdatePassword = {
      oldPassword: this.oldPassword?.value,
      password: this.password?.value,
      confirmPassword: this.password?.value
    }
    console.log("Submit")
    console.log(updatePasswordInfo);

    this.profileService.changePassword(updatePasswordInfo).subscribe({
      next: value => {
        this.isSuccessful = true;
        this.successMessage = "Password changed successfully"
        console.log(value);
        this.router.navigate(['/login'])
      },
      error: err => {
        this.isError = true;
        this.errorMessage = err.error.errors.errorMessage;
        console.log(err)

      }
    })
  }

  get firstname()
  {

    return this.userInfoForm.get('firstname');

  }

  get lastname()
  {

    return this.userInfoForm.get('lastname');

  }
  get email()
  {

    return this.userInfoForm.get('email');

  }
  get password()
  {

    return this.passwordChangeForm.get('password');

  }

  get oldPassword()
  {

    return this.passwordChangeForm.get('oldPassword');

  }
}
