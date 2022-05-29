import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectSearchData} from "../_utils/project-search-data";

@Component({
  selector: 'app-search-projects-form',
  templateUrl: './search-projects-form.component.html',
  styleUrls: ['./search-projects-form.component.css']
})
export class SearchProjectsFormComponent implements OnInit {
  projectTypes: string[] = ["ALL", "BACHELOR", "MASTERY", "DOCTORAL", "RESEARCH"];
  searchForm: FormGroup;

  @Output() searchDataEvent = new EventEmitter<ProjectSearchData>();

  constructor(private fb: FormBuilder)
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
    })
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
