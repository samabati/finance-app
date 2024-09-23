import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { AddNewBudgetsComponent } from './pages/add-new-budgets/add-new-budgets.component';
import { EditBudgetsComponent } from './pages/edit-budgets/edit-budgets.component';
import { DeleteBudgetsComponent } from './pages/delete-budgets/delete-budgets.component';

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
    children: [
      {
        path: 'add',
        component: AddNewBudgetsComponent,
      },
      {
        path: 'edit/:index',
        component: EditBudgetsComponent,
      },
      {
        path: 'delete/:index',
        component: DeleteBudgetsComponent,
      },
    ],
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
