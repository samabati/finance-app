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
import { CATEGORIES } from '../../types/categories';

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
  usedCategories!: string[];
  themes = THEMES;
  categories = CATEGORIES;
  errors: any = '';

  constructor() {
    this.loadForm();
    this.loadThemesAndCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm() {
    if (this.addBudgetForm.valid) {
      console.log('Budget being added:', this.addBudgetForm.value);
      this.budgetService.addBudget(this.addBudgetForm.value);
      this.exitPage();
    } else {
      if (this.addBudgetForm.get('max')?.errors) {
        this.errors = 'Maximum spend is required';
      }
    }
  }

  loadThemesAndCategories() {
    this.subscription.add(
      this.budgetService.budgets$.pipe(take(2)).subscribe((value: Budget[]) => {
        let usedThemes = value.map((budget) => budget.theme);
        let usedCategories = value.map((budget) => budget.category);
        console.log(
          'USED THEMES:',
          usedThemes,
          'USED CATEGORIES',
          usedCategories
        );
        if (usedThemes) {
          this.usedThemes = usedThemes;
          this.updateForm();
        }
        if (usedCategories) {
          this.usedCategories = usedCategories;
          this.updateForm();
        }
      })
    );
  }

  loadForm() {
    this.addBudgetForm = this.fb.group({
      category: ['', Validators.required],
      spent: [0],
      max: [
        '',
        [Validators.required, Validators.min(1), Validators.max(9999999)],
      ],
      theme: [' ', Validators.required],
    });
  }

  updateForm() {
    if (this.usedThemes) {
      this.addBudgetForm.patchValue({
        theme: this.themes.find((theme) => !this.isUsedTheme(theme)),
      });
    }

    if (this.usedCategories) {
      console.log('FUNCTION RAN HERE');
      this.addBudgetForm.patchValue({
        category: this.categories.find(
          (category) => !this.isUsedCategory(category)
        ),
      });
    }

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

  isUsedCategory(category: string): boolean {
    return this.usedCategories.some((used) => used == category);
  }
}
