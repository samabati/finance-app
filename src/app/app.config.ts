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
import { BudgetsService } from './services/budgets/budgets.service';

/* APP Initializer */
/*
export function initializeApp(
  transactionService: TransactionsService,
  budgetService: BudgetsService
) {
  return (): Observable<any> =>
    forkJoin([
      of(transactionService.loadTransactions()),
      of(budgetService.loadBudgets()),
    ]);
}
    */

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    [provideRouter(routes, withPreloading(PreloadAllModules))],
    TransactionsService,
    BudgetsService,
    /*
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [TransactionsService, BudgetsService],
    },
    */
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptors([loggerInterceptor])),
  ],
};
