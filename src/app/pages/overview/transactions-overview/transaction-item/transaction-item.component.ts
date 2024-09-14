import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.css',
})
export class TransactionItemComponent {
  @Input() positive!: boolean;
  @Input() amount!: string;
  @Input() name!: string;
  @Input() date!: string;
  @Input() src!: string;
}
