import {Component, Input, OnInit} from '@angular/core';
import {RatingService} from "../_services/rating.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-rating',
  templateUrl: './project-rating.component.html',
  styleUrls: ['./project-rating.component.css']
})
export class ProjectRatingComponent implements OnInit {
  currentRate = 0;

  @Input() projectId: number = 0;

  constructor(private ratingService: RatingService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.ratingService.fetchProjectRating(this.projectId).subscribe({
      next: data => {
        this.currentRate = data.rating;
      },
      error: err => {
        this.currentRate = 0;
        console.log("Could not fetch rating for project " + this.projectId.toString())
      }
    })

  }

  onRateChange(rating: number): void
  {
    this.ratingService.addProjectRating(this.projectId, rating).subscribe({
      next: data => {
        this.currentRate = data.rating;
      },
      error: err => {
        this.router.navigate(["/error"])
      }
    });
  }

}
