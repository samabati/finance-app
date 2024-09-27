import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Transactions } from '../../../../types/transactions';

@Component({
  selector: 'app-budgets-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgets-card-item.component.html',
  styleUrl: './budgets-card-item.component.css',
})
export class BudgetsCardItemComponent implements OnInit {
  @Input() positive!: boolean;
  @Input() transaction!: Transactions;

  ngOnInit(): void {
    this.positive = this.transaction.amount >= 0;
  }
}
