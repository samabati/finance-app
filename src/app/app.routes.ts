import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'budgets',
    component: TransactionsComponent,
  },
  {
    path: 'pots',
    component: TransactionsComponent,
  },
  {
    path: 'recurring-bills',
    component: TransactionsComponent,
  },
];
