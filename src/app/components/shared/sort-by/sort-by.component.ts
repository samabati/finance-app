import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sort-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-by.component.html',
  styleUrl: './sort-by.component.css',
})
export class SortByComponent implements OnInit {
  @Input() type!: string;
  selected!: Observable<String>;
  showContent: boolean = false;
  options!: Array<string>;
  minWidth!: string;
  transactionService = inject(TransactionsService);

  ngOnInit(): void {
    if (this.type === 'Sort By') {
      this.selected = this.transactionService.sort$;
      this.options = [
        'Latest',
        'Oldest',
        'A to Z',
        'Z to A',
        'Highest',
        'Lowest',
      ];
      this.minWidth = '113px';
    } else if (this.type === 'Category') {
      this.selected = this.transactionService.category$;
      this.options = [
        'All Transactions',
        'Entertainment',
        'Bills',
        'Groceries',
        'Dining Out',
        'Transportation',
        'Personal Care',
      ];
      this.minWidth = '179px';
    }
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }

  select(str: string) {
    if (this.type === 'Sort By') {
      this.transactionService.updateSort(str);
    } else if (this.type === 'Category') {
      this.transactionService.updateCategory(str);
    }
  }
}
