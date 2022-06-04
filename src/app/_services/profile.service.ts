import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserUpdateInfo} from "../_utils/user-update-info.model";
import {UserDetails} from "../_dtos/user-details.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UpdatePassword} from "../_utils/update-password.modell";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  //withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public updateUserInfo(newUserInfo: UserUpdateInfo): Observable<UserDetails>
  {
    let path: string = "/myProfile/update";

    return this.http.patch<UserDetails>(environment.BASE_API + path, newUserInfo, httpOptions);

  }

  public changePassword(updatePassword: UpdatePassword): Observable<UserDetails>
  {
    let path: string = "/myProfile/changePassword"

    return this.http.patch<UserDetails>(environment.BASE_API + path, updatePassword, httpOptions);

  }
}
