import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {LiveSearchUserResponse} from "../_dtos/live-search-user-response.model";
import {environment} from "../../environments/environment";

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
    let path: string = `/users/search?namePattern=${namePattern}`;

    if(role !== "")
      path = path + `&role=${role}`;

    return this.http.get<LiveSearchUserResponse[]>(environment.BASE_API + path, httpOptions)
      .pipe(catchError(err => of([])));

  }
}
