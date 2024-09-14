import { Component } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';
import { PotsSavingsMicroComponent } from './pots-savings-micro/pots-savings-micro.component';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [OverviewCardHeaderComponent, PotsSavingsMicroComponent],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css',
})
export class PotsOverviewComponent {}
