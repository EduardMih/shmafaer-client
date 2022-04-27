import { Injectable } from '@angular/core';
import {LoginResponse} from "../_dtos/login-response.model";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  private saveToken(token: string): void
  {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null
  {

    return window.localStorage.getItem(TOKEN_KEY);

  }

  private saveAdditionalUserData(data: LoginResponse): void
  {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      roles: data.roles
      }
    ))
  }

  public saveUserData(data: LoginResponse)
  {
    this.saveToken(data.jwtToken);
    this.saveAdditionalUserData(data);

  }

}
