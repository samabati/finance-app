import { Component, inject } from '@angular/core';
import { AddBudgetsComponent } from './add-budgets/add-budgets.component';
import { BudgetsSummaryComponent } from './budgets-summary/budgets-summary.component';
import { BudgetsCardComponent } from './budgets-card/budgets-card.component';
import { RouterOutlet } from '@angular/router';
import { BudgetsService } from '../../services/budgets/budgets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    AddBudgetsComponent,
    BudgetsSummaryComponent,
    BudgetsCardComponent,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css',
})
export class BudgetsComponent {
  budgetService = inject(BudgetsService);
}
