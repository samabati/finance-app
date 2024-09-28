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
import { Subscription } from 'rxjs';
import { Theme, THEMES } from '../../types/theme';

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
  addBudgetForm: FormGroup;
  budgetService = inject(BudgetsService);
  fb = inject(FormBuilder);
  subscription!: Subscription;
  usedThemes!: Theme[];
  themes = THEMES;

  constructor() {
    this.subscription = this.budgetService.getThemes().subscribe((value) => {
      console.log('USED THEMES:', value);
      this.usedThemes = value;
    });

    this.addBudgetForm = this.fb.group({
      category: ['Entertainment', Validators.required],
      spent: [0],
      max: [
        '',
        [Validators.required, Validators.min(1), Validators.max(9999999)],
      ],
      theme: [
        this.themes.find((theme) => !this.isUsedTheme(theme)),
        Validators.required,
      ],
    });

    this.addBudgetForm.valueChanges.subscribe((value) => {
      console.log('Form value changed: ', value);
    });
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
      console.log('Form is invalid');
    }
  }

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }

  isUsedTheme(theme: Theme): boolean {
    return this.usedThemes.some((used) => used.name == theme.name);
  }
}
