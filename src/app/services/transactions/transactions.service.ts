import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactions: BehaviorSubject<Transactions[]> = new BehaviorSubject<
    Transactions[]
  >([]);
  transactions$ = this.transactions.asObservable();

  /* Page Number Behavior Subject */
  private pageNumber: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pageNumber$ = this.pageNumber.asObservable();

  /* Sorting Behavior Subject */
  private sort: BehaviorSubject<string> = new BehaviorSubject<string>('Latest');
  sort$ = this.sort.asObservable();

  /* Category Behavior Subject */
  private category: BehaviorSubject<string> = new BehaviorSubject<string>(
    'All Transactions'
  );
  category$ = this.category.asObservable();

  /* Total pages (For button rendering) */
  private totalPages: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    []
  );
  totalPages$ = this.totalPages.asObservable();

  http = inject(HttpClient);

  constructor() {
    this.loadTransactions();
  }

  /* Load Transactions */

  loadTransactions() {
    this.http
      .get<any>('/assets/data/data.json')
      .pipe(
        take(1),
        map((value) => value.transactions)
      )
      .subscribe((value) => {
        this.sortCategory(value);
      });
  }

  /* Page methods */
  changePage(page: number) {
    this.pageNumber.next(page);
    this.loadTransactions();
  }

  incrementPage() {
    let currentPage = this.pageNumber.getValue();
    currentPage = currentPage + 1;
    if (!(currentPage > this.totalPages.getValue().length)) {
      this.changePage(currentPage);
    }
  }

  decrementPage() {
    let currentPage = this.pageNumber.getValue();
    currentPage = currentPage - 1;
    if (!(currentPage < 1)) {
      this.changePage(currentPage);
    }
  }

  /* Update sort */

  updateSort(sort: string) {
    this.sort.next(sort);
    console.log(
      'Sorting function called in service class: ',
      this.sort.getValue()
    );
    this.loadTransactions();
  }

  /* Update Category */

  updateCategory(category: string) {
    this.category.next(category);
    this.loadTransactions();
  }

  /* Filter Category */
  sortCategory(value: Transactions[]) {
    let data = value;

    if (this.category.getValue() !== 'All Transactions') {
      data = data.filter(
        (value) => value.category === this.category.getValue()
      );
    }
    this.generatePageButtons(data);
    this.sortData(data);
  }

  /* Generate Page Buttons */

  generatePageButtons(data: Transactions[]) {
    this.totalPages.next(this.createArray(Math.ceil(data.length / 10)));

    /* If current page is greater than total page numbers revert to page 1*/
    if (this.pageNumber.getValue() > this.totalPages.getValue().length) {
      this.pageNumber.next(1);
    }
  }

  /* Sort transactions */

  sortData(value: Transactions[]) {
    let data = value;
    if (this.sort.getValue() === 'Latest') {
      data = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (this.sort.getValue() === 'Oldest') {
      data = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (this.sort.getValue() === 'A to Z') {
      data = data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sort.getValue() === 'Z to A') {
      data = data.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.sort.getValue() === 'Highest') {
      data = data.sort((a, b) => b.amount - a.amount);
    } else if (this.sort.getValue() === 'Lowest') {
      data = data.sort((a, b) => a.amount - b.amount);
    }
    this.paginateData(data);
  }

  /*Paginate data*/

  paginateData(value: Transactions[]) {
    let page = this.pageNumber.getValue();
    let limit = 10;
    let start = (page - 1) * 10;
    this.transactions.next(value.slice(start, start + limit));
  }

  /*Create array*/
  createArray = (num: number) => Array.from({ length: num }, (_, i) => i + 1);
}
