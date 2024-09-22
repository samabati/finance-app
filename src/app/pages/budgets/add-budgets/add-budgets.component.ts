import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-budgets',
  standalone: true,
  imports: [],
  templateUrl: './add-budgets.component.html',
  styleUrl: './add-budgets.component.css',
})
export class AddBudgetsComponent {
  router = inject(Router);

  onClick() {
    this.router.navigateByUrl('/budgets/add');
  }
}
