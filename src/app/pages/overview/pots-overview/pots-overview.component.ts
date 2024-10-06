import { Component, inject, Input } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';
import { PotsSavingsMicroComponent } from './pots-savings-micro/pots-savings-micro.component';
import { PotsService } from '../../../services/pots/pots.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-pots-overview',
  standalone: true,
  imports: [
    OverviewCardHeaderComponent,
    PotsSavingsMicroComponent,
    CommonModule,
    SkeletonModule,
  ],
  templateUrl: './pots-overview.component.html',
  styleUrl: './pots-overview.component.css',
})
export class PotsOverviewComponent {
  potService = inject(PotsService);
  @Input() loading!: boolean;
}
