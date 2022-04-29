import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {ProjectService} from "../_services/project.service";
import {GetProjectData} from "../_dtos/get-project-data.model";

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit, AfterViewInit {
  data: GetProjectData[] = [];
  resultsLength: number = 0;

  constructor(private projectService: ProjectService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit()
  {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.projectService.fetchProjects(this.paginator.pageIndex, this.paginator.pageSize)
            .pipe(catchError(() => of(null)))

        }),
        map(data => {

          if(data === null)
            return [];

          //console.log(data);
          this.resultsLength = data.nrOfProjects;

          return data.projects;

        }),
      ).subscribe(data => (this.data = data))
  }

  isResearchProject(project: GetProjectData): boolean
  {

    return project.projectType == 'RESEARCH';

  }

}
