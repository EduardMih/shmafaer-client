import { TestBed } from '@angular/core/testing';

import { ConfirmEmailService } from './confirm-email.service';

describe('ConfirmEmailServiceService', () => {
  let service: ConfirmEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
