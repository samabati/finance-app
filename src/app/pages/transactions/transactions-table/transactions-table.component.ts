import { Component, inject, OnInit } from '@angular/core';
import { TableItemComponent } from '../table-item/table-item.component';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [TableItemComponent, CommonModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css',
})
export class TransactionsTableComponent {
  transactionService = inject(TransactionsService);
  transactions = this.transactionService.transactions$;
}
