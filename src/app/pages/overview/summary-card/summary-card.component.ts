import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css',
})
export class SummaryCardComponent {
  @Input() dark!: boolean;
  @Input() heading!: string;
  @Input() amount!: number;
}
