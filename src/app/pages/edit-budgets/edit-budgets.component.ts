import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription, take } from 'rxjs';
import { Budget } from '../../types/budget';
import { Theme, THEMES } from '../../types/theme';
import { AddThemeComponent } from '../add-new-budgets/add-theme/add-theme.component';

@Component({
  selector: 'app-edit-budgets',
  standalone: true,
  imports: [
    EditCategoryComponent,
    EditSpendComponent,
    EditThemeComponent,
    SaveChangesComponent,
    ReactiveFormsModule,
    AddThemeComponent,
  ],
  templateUrl: './edit-budgets.component.html',
  styleUrl: './edit-budgets.component.css',
})
export class EditBudgetsComponent implements OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  editBudgetForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  index!: number;
  budgetService = inject(BudgetsService);
  budget: Budget = {
    id: 999,
    category: '',
    spent: 0,
    max: 0,
    theme: { name: '', class: '', color: '' },
  };
  usedThemes!: Theme[];
  subscription!: Subscription;

  constructor() {
    this.getIndex();
    this.loadBudget();

    this.subscription = this.budgetService.getThemes().subscribe((value) => {
      this.usedThemes = value;
    });

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getIndex() {
    this.activatedRoute.params.pipe(take(1)).subscribe((value) => {
      this.index = Number(value['index']);
    });
  }

  loadBudget() {
    let loadBudget = this.budgetService.getBudget(this.index);
    if (loadBudget) this.budget = loadBudget;
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
