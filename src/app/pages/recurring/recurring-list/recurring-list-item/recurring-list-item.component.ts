import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-recurring-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recurring-list-item.component.html',
  styleUrl: './recurring-list-item.component.css',
})
export class RecurringListItemComponent {
  @Input() avatar!: string;
  @Input() name!: string;
  @Input() date!: string;
  @Input() amount!: number;
}
