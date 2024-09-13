import { Component } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [SummaryCardComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {}
