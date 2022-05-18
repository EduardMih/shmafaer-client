import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {UserService} from "../_services/user.service";
import {MinimalistUserDetailsResponse} from "../_dtos/minimalist-user-details-response.model";
import {AddProjectData} from "../_dtos/add-project-data";
import {ProjectService} from "../_services/project.service";
import {ActivatedRoute, Router} from "@angular/router";

const PROFESSOR_ROLE = "PROFESSOR";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  projectTypes: string[] = ["BACHELOR", "MASTERY", "DOCTORAL", "RESEARCH"]

  selectedCollaborators:Set<MinimalistUserDetailsResponse> = new Set();
  selectedCoordinator: MinimalistUserDetailsResponse | undefined;
  filteredCoordinators: Observable<MinimalistUserDetailsResponse[]>
  filteredCollaborators: Observable<MinimalistUserDetailsResponse[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  coordinatorCtrl = new FormControl("", [Validators.required]);
  collaboratorsCtrl = new FormControl("", [Validators.required]);
  agreeCtrl = new FormControl(false, [Validators.requiredTrue])
  isResearchProj: boolean = false;
  //isSuccessful: boolean = false;
  requestMessage: string = "";
  //isSubmitted: boolean = false;

  @Input() oldProject: AddProjectData | undefined;
  @Output() projectEvent = new EventEmitter<AddProjectData>();

  // @ts-ignore
  @ViewChild('collaboratorInput') collaboratorInput: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private router: Router,
  ) {
    this.firstFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      repoLink: ['', Validators.required]

    })

    this.secondFormGroup = this.fb.group({
      projectType: ['', Validators.required]
    })


    // @ts-ignore
    this.filteredCoordinators = this.coordinatorCtrl.valueChanges.pipe(
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
      ))

    // @ts-ignore
    this.filteredCollaborators = this.collaboratorsCtrl.valueChanges.pipe(
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
      ))
  }


  ngOnInit(): void {
    console.log(this.oldProject)
  }


  selectionChanged(event: any): void {
    console.log(this.secondFormGroup.get('projectType')?.value);

    this.isResearchProj = false;

    //if research project
    if (this.secondFormGroup.get('projectType')?.value === this.projectTypes[3])
      this.isResearchProj = true;
  }

  /*add(event: MatChipInputEvent): void
  {
    const collaborator = (event.value || '').trim();

    if((collaborator) && (collaborator in this.collaborators))
      this.selectedCollaborators.add(collaborator);

    event.chipInput!.clear();
    this.collaboratorsCtrl.setValue(null);

    if(this.selectedCollaborators.size > 0)
      this.collaboratorsCtrl.setErrors(null);
  }*/

  remove(collaborator: MinimalistUserDetailsResponse): void
  {
    this.selectedCollaborators.delete(collaborator);

    if(this.selectedCollaborators.size == 0)
      this.collaboratorsCtrl.setErrors({required: true});
  }

  selectedCollaboratorFct(event: MatAutocompleteSelectedEvent): void
  {
    let exists = false;

    this.selectedCollaborators.forEach((user) => {
      if(user.email == event.option.value.email)
        exists = true;
    })

    if(!exists)
       this.selectedCollaborators.add(event.option.value);
    //this.collaboratorsCtrl.setValue(null);
    this.collaboratorsCtrl.setErrors(null);
    console.log(this.collaboratorsCtrl)
    this.collaboratorInput.nativeElement.value = '';
  }

  selectedCoordinatorFct(event: MatAutocompleteSelectedEvent): void
  {
    this.selectedCoordinator = event.option.value;
  }

  onSubmit(): void
  {
    let data: AddProjectData = {
      title: this.firstFormGroup.value.title,
      repoLink: this.firstFormGroup.value.repoLink,
      description: this.firstFormGroup.value.description,

      projectType: this.secondFormGroup.value.projectType,

      // to be replaced with email from token
      //ownerEmail: "hamza.edw@gmail.com",

      coordinatorEmail: this.selectedCoordinator?.email,

      collaboratorsEmail: Array.from(this.selectedCollaborators, (user) => user.email)

    }

    //this.isSubmitted = true;

    this.projectEvent.emit(data);

    /*
    this.projectService.addProject(data).subscribe({
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
    */
  }

  displayUser(user: MinimalistUserDetailsResponse): string
  {

    return user.firstname?.concat(' ', user.lastname, ' (', user.email, ')');

  }
}