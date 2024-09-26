import { Component } from '@angular/core';
import { RecurringSummaryComponent } from './recurring-summary/recurring-summary.component';
import { TotalBillsComponent } from './total-bills/total-bills.component';
import { RecurringListComponent } from './recurring-list/recurring-list.component';

@Component({
  selector: 'app-recurring',
  standalone: true,
  imports: [
    RecurringSummaryComponent,
    TotalBillsComponent,
    RecurringListComponent,
  ],
  templateUrl: './recurring.component.html',
  styleUrl: './recurring.component.css',
})
export class RecurringComponent {}
