import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddProjectData} from "../_dtos/add-project-data";
import {environment} from "../../environments/environment";
import {GetProjectsResponse} from "../_dtos/get-projects-response.model";
import {GetProjectData} from "../_dtos/get-project-data.model";
import {DownloadInfo} from "../_dtos/download-info.model";

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

  fetchAllProjects(page: number, size: number): Observable<GetProjectsResponse>
  {
    let path: string = `/projects?page=${page}&size=${size}`;

    return this.http.get<GetProjectsResponse>(environment.BASE_API + path, httpOptions);

  }

  fetchUserProjects(page: number, size: number, coordinated: boolean, collaborated: boolean):
    Observable<GetProjectsResponse>
  {
    let path: string = `/projects/userProjects?page=${page}&size=${size}`;

    if(coordinated)
      path = path + `&coordinated=true`;

    else

      if(collaborated)
        path = path + `&collaborated=true`;

    return this.http.get<GetProjectsResponse>(environment.BASE_API + path, httpOptions);

  }

  sendArchivingRequest(project: GetProjectData): void
  {
    //send archive request to server - it will forward it to SH

  }

  fetchDownloadInfo(projectRepoLink: string): Observable<DownloadInfo>
  {
    let path = `/projects/archive/download?projectRepoLink=${projectRepoLink}`;

    return this.http.get<DownloadInfo>(environment.BASE_API + path, httpOptions);

  }

}
