import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetProjectRating} from "../_dtos/get-project-rating.model";
import {environment} from "../../environments/environment";
import {AddProjectRating} from "../_dtos/add-project-rating.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RatingService {

  constructor(private http: HttpClient) { }


  fetchProjectRating(projectId: number): Observable<GetProjectRating>
  {
    let path: string = `/ratings?projectID=${projectId}`;

    return this.http.get<GetProjectRating>(environment.BASE_API + path, httpOptions);

  }

  addProjectRating(projectId: number, rating: number): Observable<GetProjectRating>
  {
    let path: string = `/ratings`;
    let data: AddProjectRating = {
      projectID: projectId,
      ratingValue: rating
    };

    return this.http.post<GetProjectRating>(environment.BASE_API + path, data, httpOptions)

  }
}
