import { Component, inject, OnDestroy } from '@angular/core';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSpendComponent } from './add-spend/add-spend.component';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetsService } from '../../services/budgets/budgets.service';
import { filter, map, Subscription, take } from 'rxjs';
import { Theme, THEMES } from '../../types/theme';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { Transactions } from '../../types/transactions';
import { Budget } from '../../types/budget';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-add-new-budgets',
  standalone: true,
  imports: [
    AddCategoryComponent,
    AddSpendComponent,
    AddThemeComponent,
    AddButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-new-budgets.component.html',
  styleUrl: './add-new-budgets.component.css',
})
export class AddNewBudgetsComponent implements OnDestroy {
  router = inject(Router);
  addBudgetForm!: FormGroup;
  budgetService = inject(BudgetsService);
  transactionService = inject(TransactionsService);
  fb = inject(FormBuilder);
  subscription = new Subscription();
  usedThemes!: Theme[];
  themes = THEMES;
  errors: any = '';

  constructor() {
    this.loadForm();
    this.loadThemes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm() {
    if (this.addBudgetForm.valid) {
      this.getSpent();
      console.log('Budget being added:', this.addBudgetForm.value);
      this.budgetService.addBudget(this.addBudgetForm.value);
      this.exitPage();
    } else {
      if (this.addBudgetForm.get('max')?.errors) {
        this.errors = 'Maximum spend is required';
      }
    }
  }

  loadThemes() {
    this.subscription.add(
      this.budgetService.budgets$
        .pipe(
          take(2),
          map((budgets: Budget[]) => budgets.map((budget) => budget.theme))
        )
        .subscribe((value) => {
          console.log('USED THEMES:', value);
          if (value) {
            this.usedThemes = value;
            this.updateForm();
          }
        })
    );
  }

  getSpent() {
    this.subscription.add(
      this.transactionService.state$
        .pipe(
          take(1),
          map((state) => state.transactions),
          map((transactions) =>
            transactions.filter((item) => {
              return (
                item.category === this.addBudgetForm.get('category')?.value &&
                item.amount < 0
              );
            })
          )
        )
        .subscribe((value) => {
          console.log(
            'CATEGORY VALUE:',
            this.addBudgetForm.get('category')?.value
          );
          let totalSpent = +value.reduce(
            (a, b) => a.abs().plus(new Decimal(b.amount).abs()),
            new Decimal(0)
          );

          console.log('totalspent', totalSpent);
          this.addBudgetForm.patchValue({
            spent: totalSpent,
          });
        })
    );
  }

  loadForm() {
    this.addBudgetForm = this.fb.group({
      category: ['Entertainment', Validators.required],
      spent: [0],
      max: [
        '',
        [Validators.required, Validators.min(1), Validators.max(9999999)],
      ],
      theme: [' ', Validators.required],
    });
  }

  updateForm() {
    this.addBudgetForm.patchValue({
      theme: this.themes.find((theme) => !this.isUsedTheme(theme)),
    });

    this.subscription.add(
      this.addBudgetForm.valueChanges.subscribe((value) => {
        console.log('Form value changed: ', value);
      })
    );
  }

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }

  isUsedTheme(theme: Theme): boolean {
    return this.usedThemes.some((used) => used.name == theme.name);
  }
}
