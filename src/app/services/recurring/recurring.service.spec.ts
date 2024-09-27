import { TestBed } from '@angular/core/testing';

import { RecurringService } from './recurring.service';

describe('RecurringService', () => {
  let service: RecurringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
