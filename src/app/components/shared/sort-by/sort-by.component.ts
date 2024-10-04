import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Observable } from 'rxjs';
import { SortItems } from '../../../types/sortItems';
import { Categories } from '../../../types/categories';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { Router } from '@angular/router';

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
  recurringService = inject(RecurringService);
  router = inject(Router);
  recurring = false;

  ngOnInit(): void {
    if (this.router.url.includes('recurring')) this.recurring = true;

    if (this.type === 'Sort By' && !this.recurring) {
      this.selected = this.transactionService.getSort();
      this.options = Object.values(SortItems);
      this.minWidth = '113px';
    } else if (this.type === 'Sort By' && this.recurring) {
      this.selected = this.recurringService.getSort();
      this.options = Object.values(SortItems);
      this.minWidth = '113px';
    } else if (this.type === 'Category') {
      this.selected = this.transactionService.getCategory();
      this.options = Object.values(Categories);
      this.minWidth = '179px';
    }
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }

  select(str: string) {
    if (this.type === 'Sort By' && !this.recurring) {
      this.transactionService.updateSort(str);
    } else if (this.type === 'Sort By' && this.recurring) {
      console.log('UPDATING RECURRING STATE:', str);
      this.recurringService.updateSort(str);
    } else if (this.type === 'Category') {
      this.transactionService.updateCategory(str);
    }
  }
}
