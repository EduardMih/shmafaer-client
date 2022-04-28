import {Component, Inject, OnInit} from '@angular/core';
import {UserDetails} from "../_dtos/user-details.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  chooseRoles: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserDetails,
              private fb: FormBuilder,
              private userService: UserService)
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

  onSave()
  {
    let newRoles: string[] = [];
    //this.data.roles.splice(0, this.data.roles.length)

    Object.keys(this.chooseRoles.controls).forEach(role => {
      if(this.chooseRoles.get(role)?.value == true)
        newRoles.push(role)
    })

    this.userService.updateUserRoles(this.data.email, newRoles).subscribe({
      next: next => {
        console.log(next);
        this.data = next;
        this.dialogRef.close(this.data)
      },
      error: err => {
        console.log(err)
      }
      })


  }

}
