import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map, switchMap, take, timer } from 'rxjs';

export const loginGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return timer(100).pipe(
    switchMap(() => authService.getAuthState()),
    map((authenticated) => {
      console.log('Current auth state:', authenticated);
      if (authenticated) {
        return router.createUrlTree(['/']);
      } else {
        return true;
      }
    })
  );
};
