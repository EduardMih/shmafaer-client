import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {LiveSearchUserResponse} from "../_dtos/live-search-user-response.model";
import {environment} from "../../environments/environment";
import {UserDetails} from "../_dtos/user-details.model";
import {GetUsersResponse} from "../_dtos/get-users-response.model";

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

  fetchUsers(email: string | undefined, page: number, size: number): Observable<GetUsersResponse>
  {
    let path = `/users/search?page=${page}&size=${size}`;

    if(email !== undefined)
      path = path + `&email=${email}`

    //console.log(path)

    return this.http.get<GetUsersResponse>(environment.BASE_API + path, httpOptions);

  }

}
