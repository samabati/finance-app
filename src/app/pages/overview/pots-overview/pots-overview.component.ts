import { Component, inject } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';
import { PotsSavingsMicroComponent } from './pots-savings-micro/pots-savings-micro.component';
import { PotsService } from '../../../services/pots/pots.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [
    OverviewCardHeaderComponent,
    PotsSavingsMicroComponent,
    CommonModule,
  ],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css',
})
export class PotsOverviewComponent {
  potService = inject(PotsService);
}
