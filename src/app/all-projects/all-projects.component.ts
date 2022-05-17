import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {ProjectService} from "../_services/project.service";
import {GetProjectData} from "../_dtos/get-project-data.model";
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {GetProjectsResponse} from "../_dtos/get-projects-response.model";
import {AuthService} from "../_services/auth.service";
import {AuthTokenService} from "../_services/auth-token.service";
import {MatDialog} from "@angular/material/dialog";
import {DownloadDialogComponent} from "../download-dialog/download-dialog.component";
import {DownloadInfo} from "../_dtos/download-info.model";

const possibleTabLabels: string[] = ["All projects", "Coordinated", "Collaborated", "Owned"];

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit, AfterViewInit{
  tabLabels: string[] = [];//["All projects","Coordinated", "Collaborated", "Owned"];
  data: GetProjectData[] = [];
  resultsLength: number = 0;

  constructor(private projectService: ProjectService,
              private authTokenService: AuthTokenService,
              private dialog: MatDialog
  )
  {
    this.tabLabels.push(possibleTabLabels[0]);

    if(authTokenService.hasRole("PROFESSOR"))
      this.tabLabels.push(possibleTabLabels[1], possibleTabLabels[2], possibleTabLabels[3]);

    else
    {

      if (authTokenService.hasRole("STUDENT"))
        this.tabLabels.push(possibleTabLabels[2], possibleTabLabels[3]);

    }

  }

  @ViewChild('myPaginator') paginator!: MatPaginator;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  ngOnInit(): void {
  }



  ngAfterViewInit()
  {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.fetchProjects().pipe(catchError(() => of(null)))

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

  tabChanged(event: MatTabChangeEvent): void
  {
    this.paginator.firstPage()

    //to refresh even when already on first page but tabs changed
    this.paginator.page.emit();


  }

  private fetchProjects(): Observable<GetProjectsResponse>
  {
    let selectedTabLabel = this.tabLabels[this.tabGroup.selectedIndex!];

    if(selectedTabLabel == possibleTabLabels[0])

      return this.projectService.fetchAllProjects(this.paginator.pageIndex, this.paginator.pageSize)

    if(selectedTabLabel == possibleTabLabels[1])

      return this.projectService.fetchUserProjects(this.paginator.pageIndex, this.paginator.pageSize, true, false);

    if(selectedTabLabel == possibleTabLabels[2])

      return this.projectService.fetchUserProjects(this.paginator.pageIndex, this.paginator.pageSize, false, true);

    return this.projectService.fetchUserProjects(this.paginator.pageIndex, this.paginator.pageSize, false, false)

  }

  isDownloadable(project: GetProjectData): boolean
  {
    // to be replaced with status check

    return true;

  }

  canSendToSH(project: GetProjectData): boolean
  {
    // RESEARCH PROJECT: any collaborator can send project to SH
    if(project.projectType == "RESEARCH")
    {

      for (let collaborator of project.collaborators)
        if (collaborator.email == this.authTokenService.getUserData()?.email)

          return true;

      return false;

    }

    // OTHER PROJECT TYPE: only coordinator can send to SH

    return this.authTokenService.getUserData()?.email === project.coordinator?.email;

  }

  openDownloadDialog(project: GetProjectData): void
  {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      minWidth: '40%',
      data: project
      },
    );


  }

}
