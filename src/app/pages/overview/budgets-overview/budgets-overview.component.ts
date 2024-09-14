import { Component } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';

@Component({
  selector: 'app-budgets-overview',
  standalone: true,
  imports: [OverviewCardHeaderComponent],
  templateUrl: './budgets-overview.component.html',
  styleUrl: './budgets-overview.component.css',
})
export class BudgetsOverviewComponent {}
