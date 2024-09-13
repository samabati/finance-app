import { Component } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { PotsOverviewComponent } from './pots-overview/pots-overview.component';
import { BudgetsOverviewComponent } from './budgets-overview/budgets-overview.component';
import { TransactionsOverviewComponent } from './transactions-overview/transactions-overview.component';
import { RecurringOverviewComponent } from './recurring-overview/recurring-overview.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    SummaryCardComponent,
    PotsOverviewComponent,
    BudgetsOverviewComponent,
    TransactionsOverviewComponent,
    RecurringOverviewComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {}
