import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-delete-budgets',
  standalone: true,
  imports: [ConfirmDeleteComponent],
  templateUrl: './delete-budgets.component.html',
  styleUrl: './delete-budgets.component.css',
})
export class DeleteBudgetsComponent {
  router = inject(Router);

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }
}
