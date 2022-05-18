import { Component, OnInit } from '@angular/core';
import {AddProjectData} from "../_dtos/add-project-data";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  projectData: AddProjectData = {
    title: "Title",
    repoLink: "repoLink",
    description: "Desc",
    projectType: "Tyoe",
    collaboratorsEmail: [],
    coordinatorEmail: "email"

  }
  constructor() { }

  ngOnInit(): void {
  }

}
