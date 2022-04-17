import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {RegisterUser} from "../_dtos/register-user.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>
  {

    return this.http.post(environment.BASE_API + "/login", {
      "email": username,
      "password": password
    }, httpOptions);
  }

  register(newUser: RegisterUser): Observable<any>
  {

    //newUser.roleName = Array.of(newUser.roleName);
    console.log(newUser)

    return this.http.post(environment.BASE_API + "/register",
      newUser, httpOptions)

  }
}
