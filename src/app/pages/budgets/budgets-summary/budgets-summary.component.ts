import { Component } from '@angular/core';
import { BudgetsPieComponent } from '../../overview/budgets-overview/budgets-pie/budgets-pie.component';
import { SummaryItemComponent } from './summary-item/summary-item.component';

@Component({
  selector: 'app-budgets-summary',
  standalone: true,
  imports: [BudgetsPieComponent, SummaryItemComponent],
  templateUrl: './budgets-summary.component.html',
  styleUrl: './budgets-summary.component.css',
})
export class BudgetsSummaryComponent {
  data = [
    { category: 'Entertainment', amount: 15, maxAmount: 50 },
    { category: 'Bills', amount: 150, maxAmount: 750 },
    { category: 'Dining Out', amount: 133, maxAmount: 75 },
    { category: 'Personal Care', amount: 40, maxAmount: 150 },
  ];
}
