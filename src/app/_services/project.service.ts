import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddProjectData} from "../_dtos/add-project-data";
import {environment} from "../../environments/environment";
import {GetProjectsResponse} from "../_dtos/get-projects-response.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(project: AddProjectData): Observable<any>
  {

    return this.http.post(environment.BASE_API + "/projects", project, httpOptions);

  }

  fetchProjects(page: number, size: number): Observable<GetProjectsResponse>
  {
    let path: string = `/projects?page=${page}&size=${size}`;

    return this.http.get<GetProjectsResponse>(environment.BASE_API + path, httpOptions);

  }
}
