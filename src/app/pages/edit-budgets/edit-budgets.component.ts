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
import { map, Subscription, take } from 'rxjs';
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
  editBudgetForm: FormGroup = new FormGroup({});
  formBuilder = inject(FormBuilder);
  index!: number;
  budgetService = inject(BudgetsService);
  budget: Budget = {
    id: 0,
    category: '',
    spent: 0,
    max: 0,
    theme: { class: '', name: '', color: '' },
  };
  usedThemes!: Theme[];
  usedCategories!: string[];
  subscription = new Subscription();
  error = '';

  constructor() {
    this.getIndex();
    this.buildForm();
    this.loadBudget();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getIndex() {
    this.subscription.add(
      this.activatedRoute.params.pipe(take(1)).subscribe((value) => {
        this.index = Number(value['index']);
      })
    );
  }

  loadBudget() {
    this.subscription.add(
      this.budgetService.budgets$.pipe(take(2)).subscribe((budgets) => {
        let budget = budgets.find((budget) => budget.id === this.index);
        if (budget) {
          this.budget = budget;
          this.updateForm();
        }
        this.usedCategories = budgets.map((budget) => budget.category);
        this.usedThemes = budgets.map((budget) => budget.theme);
      })
    );
  }

  buildForm() {
    this.editBudgetForm = this.formBuilder.group({
      category: ['', Validators.required],
      max: ['', [Validators.required, Validators.min(1)]],
      spent: ['', Validators.required],
      theme: ['', Validators.required],
    });
  }

  updateForm() {
    this.editBudgetForm.patchValue({
      category: this.budget.category,
      max: this.budget.max,
      spent: this.budget.spent,
      theme: this.budget.theme,
    });

    this.subscription.add(
      this.editBudgetForm.valueChanges.subscribe((value) => {
        console.log('Changes made: ', value);
      })
    );
  }

  saveChanges() {
    if (this.editBudgetForm.pristine) {
      this.error = 'No changes have been made';
    } else if (this.editBudgetForm.valid) {
      this.budgetService.updateBudget(this.editBudgetForm.value, this.index);
      this.exitPage();
    } else {
      if (this.editBudgetForm.get('max')?.errors) {
        this.error = 'Maximum spend is required';
      }
    }
  }

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }
}
