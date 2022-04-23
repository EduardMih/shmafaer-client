import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {UserService} from "../_services/user.service";
import {LiveSearchUserResponse} from "../_dtos/live-search-user-response.model";
import {AddProjectRequest} from "../_dtos/add-project-request";
import {ProjectService} from "../_services/project.service";
import {Router} from "@angular/router";

const PROFESSOR_ROLE = "PROFESSOR";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  projectTypes: string[] = ["BACHELOR", "MASTERY", "DOCTORAL", "RESEARCH"]

  selectedCollaborators:Set<LiveSearchUserResponse> = new Set();
  selectedCoordinator: LiveSearchUserResponse | undefined;
  filteredCoordinators: Observable<LiveSearchUserResponse[]>
  filteredCollaborators: Observable<LiveSearchUserResponse[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  coordinatorCtrl = new FormControl("", [Validators.required]);
  collaboratorsCtrl = new FormControl("", [Validators.required]);
  agreeCtrl = new FormControl(false, [Validators.requiredTrue])
  isResearchProj: boolean = false;
  isSuccessful: boolean = false;
  requestMessage: string = "";
  isSubmitted: boolean = false;

  // @ts-ignore
  @ViewChild('collaboratorInput') collaboratorInput: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private router: Router
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

  remove(collaborator: LiveSearchUserResponse): void
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
    let data: AddProjectRequest = {
      title: this.firstFormGroup.value.title,
      repoLink: this.firstFormGroup.value.repoLink,
      description: this.firstFormGroup.value.description,

      projectType: this.secondFormGroup.value.projectType,

      // to be replaced with email from token
      ownerEmail: "hamza.edw@gmail.com",

      coordinatorEmail: this.selectedCoordinator?.email,

      collaboratorsEmail: Array.from(this.selectedCollaborators, (user) => user.email)

    }

    this.isSubmitted = true;

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
  }

  displayUser(user: LiveSearchUserResponse): string
  {

    return user.firstname?.concat(' ', user.lastname, ' (', user.email, ')');

  }
}
