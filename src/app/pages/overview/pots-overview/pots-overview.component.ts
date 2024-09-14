import { Component } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [OverviewCardHeaderComponent],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css',
})
export class PotsOverviewComponent {}
