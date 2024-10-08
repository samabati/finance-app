import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getAuthState().pipe(
    map((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        router.navigateByUrl('/auth/login');
        return false;
      }
    })
  );
};
