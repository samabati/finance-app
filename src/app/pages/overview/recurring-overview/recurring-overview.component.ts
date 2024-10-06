import { Component, Input } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';
import { RecurringItemComponent } from './recurring-item/recurring-item.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-recurring-overview',
  standalone: true,
  imports: [
    OverviewCardHeaderComponent,
    RecurringItemComponent,
    SkeletonModule,
  ],
  templateUrl: './recurring-overview.component.html',
  styleUrl: './recurring-overview.component.css',
})
export class RecurringOverviewComponent {
  @Input() loading!: boolean;
}
