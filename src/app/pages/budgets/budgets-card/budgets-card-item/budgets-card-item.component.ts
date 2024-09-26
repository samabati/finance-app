import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-budgets-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgets-card-item.component.html',
  styleUrl: './budgets-card-item.component.css',
})
export class BudgetsCardItemComponent {
  @Input() positive!: boolean;
  @Input() amount!: string;
  @Input() name!: string;
  @Input() date!: string;
  @Input() src!: string;
}
