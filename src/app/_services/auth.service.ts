import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {RegisterUser} from "../_dtos/register-user.model";
import {LoginResponse} from "../_dtos/login-response.model";
import {RegisterResponse} from "../_dtos/register-response.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  //withCredentials: true
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse>
  {

    return this.http.post<LoginResponse>(environment.BASE_API + "/login", {
      "email": username,
      "password": password
    }, httpOptions);

  }

  register(newUser: RegisterUser): Observable<RegisterResponse>
  {

    //newUser.roleName = Array.of(newUser.roleName);
    console.log(newUser)

    return this.http.post<RegisterResponse>(environment.BASE_API + "/register",
      newUser, httpOptions)

  }

  refreshToken(token: string): Observable<LoginResponse>
  {
    let path: string = "/refreshToken"

    return this.http.post<LoginResponse>(environment.BASE_API + path, {
      refreshToken: token
    },
      httpOptions);

  }
}
