import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css',
})
export class SummaryCardComponent {
  @Input() dark!: boolean;
  @Input() heading!: string;
  @Input() amount!: number;
  @Input() loading!: boolean;
}
