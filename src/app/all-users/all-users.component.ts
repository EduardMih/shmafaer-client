import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserDetails} from "../_dtos/user-details.model";
import {UserService} from "../_services/user.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  Subject,
  switchMap
} from "rxjs";
import {MatInput} from "@angular/material/input";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, AfterViewInit {
  data: UserDetails[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'institutionalID', "roles"];
  resultsLength: number = 0;
  emailChange: Subject<string> = new Subject<string>();
  emailSearchString: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild('input') input!: MatInput;

  constructor(private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  ngAfterViewInit()
  {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.userService.fetchUsers(this.emailSearchString, this.paginator.pageIndex, this.paginator.pageSize)
            .pipe(catchError(() => of(null)))

        }),
        map(data => {

          if(data === null)
            return [];

          //console.log(data);
          this.resultsLength = data.nrOfUsers;

          return data.users;

          }),
      ).subscribe(data => (this.data = data))

    /*
    this.emailChange.pipe(
      startWith({}),
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(data => {
      if(typeof(data) == 'string')
        this.emailSearchString = data
    })*/
  }

  applyFilter()
  {
    //console.log(this.emailSearchString)

    //this.emailChange.next((event.target as HTMLInputElement).value as string);
    this.paginator.page.emit();

  }

  clickedRow(row: UserDetails)
  {
    console.log(row)
    const dialogRef = this.dialog.open(EditUserDialogComponent, { data: row, width: '75%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if((result !== undefined) && (result !== null))
      {
        this.data.forEach(user => {
          if (user.email == result.email)
            user.roles = result.roles;
        })
      }
    })

  }
}
