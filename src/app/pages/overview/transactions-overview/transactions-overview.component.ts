import { Component } from '@angular/core';
import { OverviewCardHeaderComponent } from '../../../components/overview/overview-card-header/overview-card-header.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';

@Component({
  selector: 'app-transactions-overview',
  standalone: true,
  imports: [OverviewCardHeaderComponent, TransactionItemComponent],
  templateUrl: './transactions-overview.component.html',
  styleUrl: './transactions-overview.component.css',
})
export class TransactionsOverviewComponent {}
