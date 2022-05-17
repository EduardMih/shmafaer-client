import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DownloadInfo} from "../_dtos/download-info.model";
import {ProjectService} from "../_services/project.service";
import {GetProjectData} from "../_dtos/get-project-data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css']
})
export class DownloadDialogComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  downloadInfo!: DownloadInfo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: GetProjectData,
              public dialogRef: MatDialogRef<DownloadDialogComponent>,
              public projectService: ProjectService,
              public router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.projectService.fetchDownloadInfo(this.data.repoLink).subscribe(
      data => {
        this.downloadInfo = data;
        //console.log(this.downloadInfo)
        this.isLoading = !this.isLoading;
      },
      error => {
        this.dialogRef.close();
        this.router.navigate(['/error']);

      }
    )
  }



}
