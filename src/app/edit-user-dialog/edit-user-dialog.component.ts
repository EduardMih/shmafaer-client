import {Component, Inject, OnInit} from '@angular/core';
import {UserDetails} from "../_dtos/user-details.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  chooseRoles: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserDetails,
              private fb: FormBuilder)
  {
    this.chooseRoles = this.fb.group({
      ADMIN: data.roles.includes("ADMIN"),
      PROFESSOR: data.roles.includes("PROFESSOR"),
      STUDENT: data.roles.includes("STUDENT"),
      USER: data.roles.includes("USER")
    })
  }

  ngOnInit(): void {
  }

}
