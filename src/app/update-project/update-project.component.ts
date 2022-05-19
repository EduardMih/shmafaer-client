import { Component, OnInit } from '@angular/core';
import {AddProjectData} from "../_dtos/add-project-data";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../_services/project.service";
import {GetProjectData} from "../_dtos/get-project-data.model";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  projectId: string | null= "";
  isSuccessful: boolean = false;
  requestMessage: string = "";
  isSubmitted: boolean = false;
  isLoading: boolean = true;

  existingProjectData!: GetProjectData;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.paramMap.get("id");
    this.projectService.fetchProjectByID(this.projectId!).subscribe({
      next: project => {
        this.existingProjectData = project
          //this.createAddProjectDataDTO(project);
        //console.log(this.existingProjectData)
        this.isLoading = false;
      },
      error: err => {
        this.router.navigate(['/error'])
      }
      }

    )

  }

  updateProject(updatedProject: AddProjectData): void
  {
    //console.log(updatedProject)
    this.isSubmitted = true;
    this.projectService.updateProject(updatedProject, this.projectId!).subscribe({
      next: value => {
        this.isSuccessful = true;
        this.requestMessage = "Project updated successfully"
      },
      error: err => {
        if(err.status == 400)
        {
          this.isSuccessful = false;
          console.log(err)
          this.requestMessage = err.error.errors.errorMessage;
        }

        else

          this.router.navigate(['/error']);

      }
    });
  }
}
