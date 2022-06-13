import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectsTypesStats} from "../_dtos/projects-types-stats";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectsStatsService {

  constructor(private http: HttpClient) { }

  fetchProjectsTypesStats(): Observable<ProjectsTypesStats>
  {
    let path: string = "/projectsStats/types";

    return this.http.get<ProjectsTypesStats>(environment.BASE_API + path, httpOptions);

  }

  fetchProjectsArchivedStats(): Observable<ProjectsTypesStats>
  {
    let path: string = "/projectsStats/archived";

    return this.http.get<ProjectsTypesStats>(environment.BASE_API + path, httpOptions);

  }



}
