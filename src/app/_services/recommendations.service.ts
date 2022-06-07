import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {GetRecommendations} from "../_dtos/get-recommendations.model";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http: HttpClient) { }

  public fetchRecommendations(page: number, pageSize: number): Observable<GetRecommendations>
  {
    let path: string = `/recommendations?page=${page}&size=${pageSize}`;

    return this.http.get<GetRecommendations>(environment.BASE_API + path, httpOptions);

  }
}
