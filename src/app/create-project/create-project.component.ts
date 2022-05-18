import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../_services/project.service";
import {AddProjectData} from "../_dtos/add-project-data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  isSuccessful: boolean = false;
  requestMessage: string = "";
  isSubmitted: boolean = false;


  constructor(public projectService: ProjectService,
              public router: Router
  ) { }

  ngOnInit(): void {
  }

  createProject(newProject: AddProjectData): void
  {
    this.isSubmitted = true;
    this.projectService.addProject(newProject).subscribe({
      next: value => {
        this.isSuccessful = true;
        this.requestMessage = value.message;
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

    console.log(newProject)
  }

}
