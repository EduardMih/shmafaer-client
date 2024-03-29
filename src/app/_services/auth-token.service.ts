import { Injectable } from '@angular/core';
import {LoginResponse} from "../_dtos/login-response.model";
import {UserDetails} from "../_dtos/user-details.model";
import {MinimalistUserDetailsResponse} from "../_dtos/minimalist-user-details-response.model";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESH_TOKEN_KEY = 'auth-refreshToken';

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

  public getUserData(): UserDetails | null
  {
    const user = window.localStorage.getItem(USER_KEY);

    if(user)

      return JSON.parse(user);

    return null;

  }

  private saveAdditionalUserData(data: LoginResponse): void
  {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      roles: data.roles
      }
    ))
  }

  public saveUserData(data: LoginResponse)
  {
    this.saveToken(data.jwtToken);
    this.saveRefreshToken(data.refreshToken);
    this.saveAdditionalUserData(data);

  }

  public hasRole(role: string): boolean
  {
    const user = this.getUserData()

    //console.log(user?.roles)

    if(user)

      return user && user.roles.includes(role);

    return false;

  }

  public isAuthenticated(): boolean
  {
    if(this.getToken() && this.getUserData())

      return true;

    return false;

  }

  public logout(): void
  {
    window.localStorage.clear();
  }

  public saveRefreshToken(refreshToken: string)
  {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getRefreshToken(): string | null
  {

    return window.localStorage.getItem(REFRESH_TOKEN_KEY);

  }

}
