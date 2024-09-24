import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BudgetsService } from '../../../../services/budgets/budgets.service';
import { PotsService } from '../../../../services/pots/pots.service';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css',
})
export class ConfirmDeleteComponent {
  @Input() type!: string;
  @Input() index!: number;
  @Output() exitPage = new EventEmitter<Event>();
  budgetService = inject(BudgetsService);
  potService = inject(PotsService);

  deleteResource() {
    if (this.type === 'budgets') this.budgetService.removeBudget(this.index);
    else if (this.type === 'pots') this.potService.removePot(this.index);
    this.exitPage.emit();
  }
}
