import { Component, inject } from '@angular/core';
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
export class AddNewBudgetsComponent {
  router = inject(Router);
  addBudgetForm: FormGroup;
  budgetService = inject(BudgetsService);
  fb = inject(FormBuilder);

  constructor() {
    this.addBudgetForm = this.fb.group({
      category: ['Entertainment', Validators.required],
      spent: [0],
      max: ['', [Validators.required, Validators.min(1)]],
      theme: [{ name: 'Green', class: 'bg-g' }, Validators.required],
    });

    this.addBudgetForm.valueChanges.subscribe((value) => {
      console.log('Form value changed: ', value);
    });
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
}
