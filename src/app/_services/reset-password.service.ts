import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForgotPassword} from "../_dtos/forgot-password.model";
import {environment} from "../../environments/environment";
import {ResetPassword} from "../_dtos/reset-password";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendResetRequest(email: string): Observable<ForgotPassword>
  {
    let path: string = `/resetPassword?email=${email}`;

    return this.http.get<ForgotPassword>(environment.BASE_API + path, httpOptions);

  }

  resetPassword(password: string, confirmPassword: string, token: string): Observable<ForgotPassword>
  {
    let path: string = `/resetPassword`;
    let data: ResetPassword = {
      password: password,
      confirmPassword: confirmPassword,
      token: token
    };

    return this.http.patch<ForgotPassword>(environment.BASE_API + path, data, httpOptions);

  }
}
