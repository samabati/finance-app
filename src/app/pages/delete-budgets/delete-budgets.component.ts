import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { BudgetsService } from '../../services/budgets/budgets.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-delete-budgets',
  standalone: true,
  imports: [ConfirmDeleteComponent],
  templateUrl: './delete-budgets.component.html',
  styleUrl: './delete-budgets.component.css',
})
export class DeleteBudgetsComponent {
  router = inject(Router);
  budgetService = inject(BudgetsService);
  index!: number;
  title!: string;
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((value) => {
      this.index = Number(value['index']);
      this.loadTitle();
    });
  }

  loadTitle() {
    this.budgetService.budgets$.pipe(take(1)).subscribe((value) => {
      value.forEach((value, index) => {
        if (index === this.index) this.title = value.category;
      });
    });
  }

  exitPage() {
    this.router.navigateByUrl('/budgets');
  }
}
