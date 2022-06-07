import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Recommendation} from "../_dtos/recommendation.model";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {RecommendationsService} from "../_services/recommendations.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit, AfterViewInit {
  data: Recommendation[] = [];

  @ViewChild("myPaginatorRecommendations") paginator!: MatPaginator;

  resultsLength: number = 0;

  constructor(private recommendationsService: RecommendationsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.recommendationsService.fetchRecommendations(this.paginator.pageIndex, this.paginator.pageSize).pipe(catchError(() => of(null)))

        }),
        map(data => {
          //console.log(data)

          if(data === null)
            return [];

          //console.log(data);
          this.resultsLength = data.nrOfRecommendations;

          return data.recommendations;

        }),
      ).subscribe(data => (this.data = data))

  }

  hasTopics(recommendation: Recommendation): boolean
  {
    console.log(recommendation)

    return recommendation.topics != null;

  }

}
