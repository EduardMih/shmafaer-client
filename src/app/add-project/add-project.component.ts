import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  projectTypes: string[] = ["BACHELOR", "MASTERY", "DOCTORAL", "RESEARCH"]

  coordinators: string[] = ["Alboaie Lenuta", "Panu Andrei",
    "Cristina Frasinaru", "Corneliu Buraga"];
  collaborators: string[] = ["Alboaie Lenuta", "Panu Andrei",
    "Cristina Frasinaru", "Corneliu Buraga"];

  selectedCollaborators:Set<string> = new Set();
  filtered: Observable<string[]>
  filteredCollaborators: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  coordinator = new FormControl("", [Validators.required]);
  collaboratorsCtrl = new FormControl("", [Validators.required]);
  agreeCtrl = new FormControl(false, [Validators.requiredTrue])
  isResearchProj: boolean = false;

  // @ts-ignore
  @ViewChild('collaboratorInput') collaboratorInput: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    this.firstFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      repoLink: ['', Validators.required]

    })

    this.secondFormGroup = this.fb.group({
      projectType: ['', Validators.required]
    })


    // @ts-ignore
    this.filtered = this.coordinator.valueChanges.pipe(
      startWith(''),
      map(value => this.coordinators.filter(option => option.toLowerCase()
        .includes(value.toLowerCase())))
    );

    // @ts-ignore
    this.filteredCollaborators = this.collaboratorsCtrl.valueChanges.pipe(
      startWith(null),
      map((collaborator: string ) =>
        (collaborator ? this.collaborators.filter(currentCollaborator =>
          currentCollaborator.toLowerCase().includes(collaborator.toLowerCase())) : []))
    );
  }


  ngOnInit(): void {
  }


  display()
  {
    console.log(this.firstFormGroup.value)
  }

  selectionChanged(event: any): void {
    console.log(this.secondFormGroup.get('projectType')?.value);

    this.isResearchProj = false;

    //if research project
    if (this.secondFormGroup.get('projectType')?.value === this.projectTypes[3])
      this.isResearchProj = true;
  }

  add(event: MatChipInputEvent): void
  {
    const collaborator = (event.value || '').trim();

    if((collaborator) && (collaborator in this.collaborators))
      this.selectedCollaborators.add(collaborator);

    event.chipInput!.clear();
    this.collaboratorsCtrl.setValue(null);

    if(this.selectedCollaborators.size > 0)
      this.collaboratorsCtrl.setErrors(null);
  }

  remove(collaborator: string): void
  {
    this.selectedCollaborators.delete(collaborator);

    if(this.selectedCollaborators.size == 0)
      this.collaboratorsCtrl.setErrors({required: true});
  }

  selected(event: MatAutocompleteSelectedEvent): void
  {
    this.selectedCollaborators.add(event.option.viewValue);
    this.collaboratorsCtrl.setValue(null);
    this.collaboratorsCtrl.setErrors(null);
    console.log(this.collaboratorsCtrl)
    this.collaboratorInput.nativeElement.value = '';
  }

  onSubmit(): void
  {
    console.log(this.agreeCtrl)

  }
}
