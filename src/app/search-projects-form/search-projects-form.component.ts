import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectSearchData} from "../_utils/project-search-data";
import {debounceTime, distinctUntilChanged, Observable, startWith, switchMap} from "rxjs";
import {MinimalistUserDetailsResponse} from "../_dtos/minimalist-user-details-response.model";
import {UserService} from "../_services/user.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

const PROFESSOR_ROLE = "PROFESSOR";

@Component({
  selector: 'app-search-projects-form',
  templateUrl: './search-projects-form.component.html',
  styleUrls: ['./search-projects-form.component.css']
})
export class SearchProjectsFormComponent implements OnInit {
  projectTypes: string[] = ["ALL", "BACHELOR", "MASTERY", "DOCTORAL", "RESEARCH"];
  searchForm: FormGroup;
  filteredCoordinators?: Observable<MinimalistUserDetailsResponse[]>
  filteredContributors?: Observable<MinimalistUserDetailsResponse[]>;

  @Output() searchDataEvent = new EventEmitter<ProjectSearchData>();

  constructor(private fb: FormBuilder, private userService: UserService)
  {
    this.searchForm = new FormGroup({
      isTitleActive:  new FormControl({value: true}),
      isCoordinatorActive: new FormControl(),
      isContributorActive: new FormControl(),
      titleSearch: new FormControl(
        {value: undefined, disabled: false},
        Validators.required
      ),
      coordinator: new FormControl(
        {value: undefined, disabled: true},
        Validators.required
      ),
      contributor: new FormControl(
        {value: undefined, disabled: true},
        Validators.required
      ),
      projectType: new FormControl(
        {value: this.projectTypes[0], disabled: false},
        Validators.required
      ),
    });

    this.filteredCoordinators = this.searchForm.get('coordinator')?.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(namePattern => {
          if ((namePattern != "") && (typeof (namePattern) === "string")) {
            console.log("Searching for " + namePattern, typeof (namePattern))

            return this.userService.fetchUsersByNamePatternAndRole(namePattern, PROFESSOR_ROLE);

          }

          return [];

        }
      ));

    // @ts-ignore
    this.filteredContributors = this.searchForm.get('contributor').valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(namePattern => {
          if ((namePattern != "") && (typeof (namePattern) === "string"))
          {
            console.log("Searching for " + namePattern, typeof (namePattern))

            return this.userService.fetchUsersByNamePatternAndRole(namePattern, "");

          }

          return [];

        }
      ));
  }

  ngOnInit(): void {
    this.searchForm.get('isTitleActive')?.valueChanges.subscribe(
      value => {
          if(value)
            this.searchForm.get('titleSearch')?.enable();

        else

        {
          this.searchForm.get('titleSearch')?.setValue(undefined);
            this.searchForm.get('titleSearch')?.disable();
        }
      }
    );

    this.searchForm.get('isCoordinatorActive')?.valueChanges.subscribe(
      value => {
        if(value == true)
          this.searchForm.get('coordinator')?.enable();

        else

        {
          this.searchForm.get('coordinator')?.setValue(undefined);
          this.searchForm.get('coordinator')?.disable();
        }
      }
    );

    this.searchForm.get('isContributorActive')?.valueChanges.subscribe(
      value => {
        if(value == true)
          this.searchForm.get('contributor')?.enable();

        else
        {
          this.searchForm.get('contributor')?.setValue(undefined);
          this.searchForm.get('contributor')?.disable();
        }
      }
    );

    this.searchForm.get('projectType')?.valueChanges.subscribe(
      value =>
      {
        if(value == this.projectTypes[4])
          this.searchForm.get('isCoordinatorActive')?.setValue(false);


      }
    )
  }

  onSearch(): void
  {

    let searchData: ProjectSearchData = {
      titlePattern: this.searchForm.get('titleSearch')?.value,
      contributorEmail: this.searchForm.get('contributor')?.value,
      coordinatorEmail: this.searchForm.get('coordinator')?.value,
      projectType: this.searchForm.get('projectType')?.value
    };

    //console.log(searchData);
    //console.log(searchData.coordinatorEmail == null)

    this.searchDataEvent.emit(searchData);
  }
}
