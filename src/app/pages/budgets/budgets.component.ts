import { Component } from '@angular/core';
import { AddBudgetsComponent } from './add-budgets/add-budgets.component';
import { BudgetsSummaryComponent } from './budgets-summary/budgets-summary.component';
import { BudgetsCardComponent } from './budgets-card/budgets-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    AddBudgetsComponent,
    BudgetsSummaryComponent,
    BudgetsCardComponent,
    RouterOutlet,
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css',
})
export class BudgetsComponent {
  data = [
    {
      category: 'Entertainment',
      spent: 15,
      max: 50,
    },
    {
      category: 'Bills',
      spent: 150,
      max: 750,
    },
    {
      category: 'Dining Out',
      spent: 133.75,
      max: 75,
    },
    {
      category: 'Personal Care',
      spent: 40,
      max: 100,
    },
  ];
}
