import { Component, inject, Inject, OnInit } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { PotsOverviewComponent } from './pots-overview/pots-overview.component';
import { BudgetsOverviewComponent } from './budgets-overview/budgets-overview.component';
import { TransactionsOverviewComponent } from './transactions-overview/transactions-overview.component';
import { RecurringOverviewComponent } from './recurring-overview/recurring-overview.component';
import { SkeletonModule } from 'primeng/skeleton';
import { Subscription } from 'rxjs';
import { PotsService } from '../../services/pots/pots.service';
import { BudgetsService } from '../../services/budgets/budgets.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    SummaryCardComponent,
    PotsOverviewComponent,
    BudgetsOverviewComponent,
    TransactionsOverviewComponent,
    RecurringOverviewComponent,
    SkeletonModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  loading = true;
  potsLoaded = false;
  budgetsLoaded = false;
  potsService = inject(PotsService);
  budgetsService = inject(BudgetsService);
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.potsService.loading$.subscribe((value) => {
        this.potsLoaded = !value;
        console.log('Pots loading:', value);
        this.updatedLoading();
      })
    );

    this.subscription.add(
      this.budgetsService.loading$.subscribe((value) => {
        this.budgetsLoaded = !value;
        console.log('Budgets loading', value);
        this.updatedLoading();
      })
    );
  }

  updatedLoading() {
    this.loading = !(this.potsLoaded && this.budgetsLoaded);
  }
}
