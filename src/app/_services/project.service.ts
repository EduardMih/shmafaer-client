import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddProjectRequest} from "../_dtos/add-project-request";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(project: AddProjectRequest): Observable<any>
  {

    return this.http.post(environment.BASE_API + "/projects", project, httpOptions);

  }


}
