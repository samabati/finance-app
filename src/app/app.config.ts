import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TransactionsService } from './services/transactions/transactions.service';
import { forkJoin, Observable, of } from 'rxjs';
import { loggerInterceptor } from './interceptors/logger.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth/auth.service';
import { RecurringService } from './services/recurring/recurring.service';

/* APP Initializer
Pre loading :
- Transactions
- Recurring transactions
- Auth (if user token exists in local storage)*/
export function initializeApp(
  authService: AuthService,
  transactionService: TransactionsService,
  recurringService: RecurringService
) {
  return (): Observable<any> =>
    forkJoin([
      of(authService.checkStorage()),
      of(transactionService.loadTransactions()),
      of(recurringService.loadBills()),
    ]);
}

/*
export function initializeAuth(authService: AuthService) {
  return () => authService.checkStorage(); // Ensure token validation runs before app loads
}
*/

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    [provideRouter(routes, withPreloading(PreloadAllModules))],
    AuthService,
    TransactionsService,
    RecurringService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService, TransactionsService, RecurringService],
    },
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptors([loggerInterceptor, authInterceptor])),
  ],
};
