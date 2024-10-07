import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { map, switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  return authService.getToken().pipe(
    take(1),
    switchMap((token) => {
      if (token) {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        let newReq = req.clone({ headers });
        return next(newReq);
      }
      return next(req); // No token, proceed without modification
    })
  );
};
