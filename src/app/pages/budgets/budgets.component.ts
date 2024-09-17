import { Component } from '@angular/core';
import { AddBudgetsComponent } from './add-budgets/add-budgets.component';
import { BudgetsSummaryComponent } from './budgets-summary/budgets-summary.component';
import { BudgetsCardComponent } from './budgets-card/budgets-card.component';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [AddBudgetsComponent, BudgetsSummaryComponent, BudgetsCardComponent],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css',
})
export class BudgetsComponent {}
