import { TestBed } from '@angular/core/testing';

import { ProjectsStatsService } from './projects-stats.service';

describe('ProjectsStatsService', () => {
  let service: ProjectsStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
