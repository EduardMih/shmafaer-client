import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthTokenService} from "../_services/auth-token.service";
import {ConfirmEmailService} from "../_services/confirm-email.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  isConfirmationSuccessful: boolean = false;
  isLoading: boolean = true;
  message: string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private authTokenService: AuthTokenService,
              private confirmEmailService: ConfirmEmailService) { }

  ngOnInit(): void {
    this.authTokenService.logout();
    let token = this.activatedRoute.snapshot.queryParamMap.get('token');

    this.confirmEmailService.confirmEmail(token!).subscribe({
      next: value => {
        this.message = value.message;
        this.isLoading = false;
        this.isConfirmationSuccessful = true;

    },
      error: err => {
        this.isConfirmationSuccessful = false;
        this.isLoading = false;
        this.message = err.error.errorMessage;

      }
    })



    console.log(token)
  }

}
