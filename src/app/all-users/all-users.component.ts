import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserDetails} from "../_dtos/user-details.model";
import {UserService} from "../_services/user.service";
import {catchError, map, of, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, AfterViewInit {
  data: UserDetails[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'institutionalID', "roles"];
  resultsLength: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit()
  {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.userService.fetchUsers(undefined,
            this.paginator.pageIndex, this.paginator.pageSize)
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
  }
}
