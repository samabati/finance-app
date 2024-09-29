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
import { provideHttpClient } from '@angular/common/http';
import { TransactionsService } from './services/transactions/transactions.service';
import { Observable, of } from 'rxjs';

/* APP Initializer */

export function initializeApp(transactionService: TransactionsService) {
  return (): Observable<any> => of(transactionService.loadTransactions());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    [provideRouter(routes, withPreloading(PreloadAllModules))],
    TransactionsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [TransactionsService],
    },
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
  ],
};
