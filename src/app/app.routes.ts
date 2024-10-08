import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { AddNewBudgetsComponent } from './pages/add-new-budgets/add-new-budgets.component';
import { EditBudgetsComponent } from './pages/edit-budgets/edit-budgets.component';
import { AddNewPotsComponent } from './pages/add-new-pots/add-new-pots.component';
import { EditPotsComponent } from './pages/edit-pots/edit-pots.component';
import { DeleteComponent } from './pages/delete/delete/delete.component';
import { AddWithdrawComponent } from './pages/add-withdraw/add-withdraw.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { authGuard } from './guards/auth/auth.guard';
import { loginGuard } from './guards/login/login.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      { path: 'overview', component: OverviewComponent },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./pages/transactions/transactions.component').then(
            (m) => m.TransactionsComponent
          ),
        data: { preload: true },
      },
      {
        path: 'budgets',
        loadComponent: () =>
          import('./pages/budgets/budgets.component').then(
            (m) => m.BudgetsComponent
          ),
        data: { preload: true },
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
        loadComponent: () =>
          import('./pages/pots/pots.component').then((m) => m.PotsComponent),
        data: { preload: true },
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
        loadComponent: () =>
          import('./pages/recurring/recurring.component').then(
            (m) => m.RecurringComponent
          ),
        data: { preload: true },
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [loginGuard],
    canActivateChild: [loginGuard],
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
];
