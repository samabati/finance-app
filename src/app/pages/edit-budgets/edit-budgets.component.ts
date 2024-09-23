import { Component, inject } from '@angular/core';
import { AddCategoryComponent } from '../add-new-budgets/add-category/add-category.component';
import { AddSpendComponent } from '../add-new-budgets/add-spend/add-spend.component';
import { AddThemeComponent } from '../add-new-budgets/add-theme/add-theme.component';
import { SaveChangesComponent } from './save-changes/save-changes.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-budgets',
  standalone: true,
  imports: [
    AddCategoryComponent,
    AddSpendComponent,
    AddThemeComponent,
    SaveChangesComponent,
  ],
  templateUrl: './edit-budgets.component.html',
  styleUrl: './edit-budgets.component.css',
})
export class EditBudgetsComponent {
  router = inject(Router);

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }
}
