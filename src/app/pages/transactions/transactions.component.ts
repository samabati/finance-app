import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { SortByComponent } from '../../components/shared/sort-by/sort-by.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SearchBarComponent, SortByComponent, TransactionsTableComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {}
