import { Component } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';
import { RecurringItemComponent } from './recurring-item/recurring-item.component';

@Component({
  selector: 'app-recurring-overview',
  standalone: true,
  imports: [OverviewCardHeaderComponent, RecurringItemComponent],
  templateUrl: './recurring-overview.component.html',
  styleUrl: './recurring-overview.component.css',
})
export class RecurringOverviewComponent {}
