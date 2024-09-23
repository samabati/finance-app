import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BudgetsService } from '../../../services/budgets/budgets.service';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css',
})
export class ConfirmDeleteComponent {
  @Input() index!: number;
  @Output() exitPage = new EventEmitter<Event>();
  budgetService = inject(BudgetsService);

  deleteBudget() {
    this.budgetService.removeBudget(this.index);
    this.exitPage.emit();
  }
}
