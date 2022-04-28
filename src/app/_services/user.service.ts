import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {LiveSearchUserResponse} from "../_dtos/live-search-user-response.model";
import {environment} from "../../environments/environment";
import {UserDetails} from "../_dtos/user-details.model";
import {GetUsersResponse} from "../_dtos/get-users-response.model";
import {UpdateUserRoles} from "../_dtos/update-user-roles.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  fetchUsersByNamePatternAndRole(namePattern: string, role: string): Observable<LiveSearchUserResponse[]>
  {
    let path: string = `/users/liveSearch?namePattern=${namePattern}`;

    if(role !== "")
      path = path + `&role=${role}`;

    return this.http.get<LiveSearchUserResponse[]>(environment.BASE_API + path, httpOptions)
      .pipe(catchError(err => of([])));

  }

  fetchUsers(email: string, page: number, size: number): Observable<GetUsersResponse>
  {
    let path = `/users/search?page=${page}&size=${size}`;

    if(email !== "")
      path = path + `&email=${email}`

    console.log(path)

    return this.http.get<GetUsersResponse>(environment.BASE_API + path, httpOptions);

  }
  public updateUserRoles(email: string, newRoles: string[]): Observable<UserDetails>
  {
    let updateDTO: UpdateUserRoles = {
      email: email,
      newRoles: newRoles
    }

    return this.http.patch<UserDetails>(environment.BASE_API + "/users/update/roles", updateDTO ,httpOptions);

  }

}
