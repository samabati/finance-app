import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { loginGuard } from './login.guard';

describe('loginGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
