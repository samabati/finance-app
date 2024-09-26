import { TestBed } from '@angular/core/testing';

import { PotsService } from './pots.service';

describe('PotsService', () => {
  let service: PotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
