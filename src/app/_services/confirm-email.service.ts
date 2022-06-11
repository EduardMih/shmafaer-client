import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfirmEmailReq} from "../_dtos/confirm-email-req";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ConfirmEmailResp} from "../_dtos/confirm-email-resp";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  //withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {

  constructor(private http: HttpClient) { }

  confirmEmail(token: string): Observable<ConfirmEmailResp>
  {
    let path: string = "/confirmAccount";
    let data: ConfirmEmailReq = {
      token: token
    }

    return this.http.patch<ConfirmEmailResp>(environment.BASE_API + path, data, httpOptions);

  }

  resendToken(token: string): Observable<ConfirmEmailResp>
  {
    let path: string = "/confirmAccount/resendToken";
    let data: ConfirmEmailReq = {
      token: token
    }
    return this.http.post<ConfirmEmailResp>(environment.BASE_API + path, data, httpOptions);

  }
}
