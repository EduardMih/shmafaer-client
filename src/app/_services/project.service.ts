import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddProjectData} from "../_dtos/add-project-data";
import {environment} from "../../environments/environment";
import {GetProjectsResponse} from "../_dtos/get-projects-response.model";
import {GetProjectData} from "../_dtos/get-project-data.model";
import {DownloadInfo} from "../_dtos/download-info.model";
import {ProjectSearchData} from "../_utils/project-search-data";

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

  fetchProjectByID(id: string): Observable<GetProjectData>
  {
    let path: string = `/projects/${id}`;

    return this.http.get<GetProjectData>(environment.BASE_API + path, httpOptions);

  }

  searchProjects(searchData: ProjectSearchData, pageIndex: number, pageSize: number): Observable<GetProjectsResponse>
  {
    let path: string = `/projects/search`;
    let params = new HttpParams();

    params = params.append('projectType', searchData.projectType)
      .append('page', pageIndex)
      .append('size', pageSize);

    if(searchData.titlePattern != undefined)
      params = params.append('titlePattern', searchData.titlePattern);

    if(searchData.coordinatorEmail != undefined)
      params = params.append('coordinator', searchData.coordinatorEmail);

    if(searchData.contributorEmail != undefined)
      params = params.append('contributor', searchData.contributorEmail);

    return this.http.get<GetProjectsResponse>(environment.BASE_API + path,
      { params: params, headers: httpOptions.headers });

  }

  updateProject(projectData: AddProjectData, id: string): Observable<GetProjectData>
  {
    let path: string = `/projects/${id}`;

    return this.http.put<GetProjectData>(environment.BASE_API + path, projectData, httpOptions);

  }

  sendArchivingRequest(project: GetProjectData): Observable<GetProjectData>
  {
    //send archive request to server - it will forward it to SH

    let path = `/projects/archive?projectRepoLink=${project.repoLink}`;

    return this.http.post<GetProjectData>(environment.BASE_API + path, httpOptions)

  }

  updateProjectStatus(project: GetProjectData): Observable<GetProjectData>
  {
    let path = `/projects/archive?projectRepoLink=${project.repoLink}`;

    return this.http.get<GetProjectData>(environment.BASE_API + path, httpOptions)

  }

  fetchDownloadInfo(projectRepoLink: string): Observable<DownloadInfo>
  {
    let path = `/projects/archive/download?projectRepoLink=${projectRepoLink}`;

    return this.http.get<DownloadInfo>(environment.BASE_API + path, httpOptions);

  }

}
