import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';

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
    component: BudgetsComponent,
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
