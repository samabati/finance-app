import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { AddNewBudgetsComponent } from './pages/add-new-budgets/add-new-budgets.component';
import { EditBudgetsComponent } from './pages/edit-budgets/edit-budgets.component';
import { PotsComponent } from './pages/pots/pots.component';
import { AddNewPotsComponent } from './pages/add-new-pots/add-new-pots.component';
import { EditPotsComponent } from './pages/edit-pots/edit-pots.component';
import { DeleteComponent } from './pages/delete/delete/delete.component';
import { AddWithdrawComponent } from './pages/add-withdraw/add-withdraw.component';
import { RecurringComponent } from './pages/recurring/recurring.component';

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
        component: DeleteComponent,
      },
    ],
  },
  {
    path: 'pots',
    component: PotsComponent,
    children: [
      {
        path: 'add',
        component: AddNewPotsComponent,
      },
      {
        path: 'edit/:index',
        component: EditPotsComponent,
      },
      {
        path: 'delete/:index',
        component: DeleteComponent,
      },
      {
        path: ':index/add',
        component: AddWithdrawComponent,
      },
      {
        path: ':index/withdraw',
        component: AddWithdrawComponent,
      },
    ],
  },
  {
    path: 'recurring-bills',
    component: RecurringComponent,
  },
];
