import { Component, inject } from '@angular/core';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSpendComponent } from './add-spend/add-spend.component';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-budgets',
  standalone: true,
  imports: [
    AddCategoryComponent,
    AddSpendComponent,
    AddThemeComponent,
    AddButtonComponent,
  ],
  templateUrl: './add-new-budgets.component.html',
  styleUrl: './add-new-budgets.component.css',
})
export class AddNewBudgetsComponent {
  router = inject(Router);

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }
}
