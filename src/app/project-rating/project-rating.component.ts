import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-rating',
  templateUrl: './project-rating.component.html',
  styleUrls: ['./project-rating.component.css']
})
export class ProjectRatingComponent implements OnInit {
  currentRate = 8.7;

  constructor() { }

  ngOnInit(): void {
  }

}
