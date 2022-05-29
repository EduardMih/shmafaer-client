import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProjectsFormComponent } from './search-projects-form.component';

describe('SearchProjectsFormComponent', () => {
  let component: SearchProjectsFormComponent;
  let fixture: ComponentFixture<SearchProjectsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProjectsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
