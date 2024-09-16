import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { SortByComponent } from '../../components/shared/sort-by/sort-by.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { PageNavComponent } from './page-nav/page-nav.component';
import { PageNumberComponent } from './page-number/page-number.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    SearchBarComponent,
    SortByComponent,
    TransactionsTableComponent,
    PageNavComponent,
    PageNumberComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {}
