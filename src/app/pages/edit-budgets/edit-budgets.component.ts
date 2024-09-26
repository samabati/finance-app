import { Component, inject, OnInit } from '@angular/core';
import { SaveChangesComponent } from './save-changes/save-changes.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditSpendComponent } from './edit-spend/edit-spend.component';
import { EditThemeComponent } from './edit-theme/edit-theme.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetsService } from '../../services/budgets/budgets.service';
import { take } from 'rxjs';
import { Budget } from '../../types/budget';

@Component({
  selector: 'app-edit-budgets',
  standalone: true,
  imports: [
    EditCategoryComponent,
    EditSpendComponent,
    EditThemeComponent,
    SaveChangesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-budgets.component.html',
  styleUrl: './edit-budgets.component.css',
})
export class EditBudgetsComponent {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  editBudgetForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  index!: number;
  budgetService = inject(BudgetsService);
  budget!: Budget;

  constructor() {
    this.getIndex();

    this.loadBudget();

    this.editBudgetForm = this.formBuilder.group({
      category: [this.budget.category, Validators.required],
      max: [this.budget.max, [Validators.required, Validators.min(1)]],
      spent: [this.budget.spent, Validators.required],
      theme: [this.budget.theme, Validators.required],
    });

    this.editBudgetForm.valueChanges.subscribe((value) => {
      console.log('Changes made: ', value);
    });
  }

  getIndex() {
    this.activatedRoute.params.pipe(take(1)).subscribe((value) => {
      this.index = Number(value['index']);
    });
  }

  loadBudget() {
    this.budget = this.budgetService.getBudget(this.index);
  }

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }

  saveChanges() {
    if (this.editBudgetForm.valid) {
      console.log('Editing budget:', this.editBudgetForm.value);
      this.budgetService.updateBudget(this.editBudgetForm.value, this.index);
      this.exitPage();
    }
  }
}
