import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, pipe, take } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient } from '@angular/common/http';

interface State {
  transactions: Transactions[];
  currentPage: number;
  sort: string;
  category: string;
  search: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  /* State */
  private state: BehaviorSubject<State> = new BehaviorSubject<State>({
    transactions: [],
    currentPage: 1,
    sort: 'Latest',
    category: 'All Transactions',
    search: '',
  });

  /* Needed for generating page buttons*/
  private totalPages: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    []
  );
  totalPages$ = this.totalPages.asObservable();

  state$ = this.state.asObservable();

  http = inject(HttpClient);

  constructor() {
    this.loadTransactions();
  }

  /* Load transactions */

  loadTransactions() {
    this.http
      .get<any>('/assets/data/data.json')
      .pipe(
        take(1),
        map((value) => value.transactions)
      )
      .subscribe((transactions) =>
        this.state.next({ ...this.state.getValue(), transactions })
      );
  }

  getRawTransactions() {
    return this.state$.pipe(map((value) => value.transactions));
  }

  /* Displayed transaction data */
  getDisplayTransactions() {
    return this.state$.pipe(
      filter((state) => state.transactions.length > 0), // Emit only when data is loaded
      map((value) => value.transactions),
      map((transactions) => this.filterSearch(transactions)),
      map((transactions) => this.sortCategory(transactions)),
      map((transactions) => this.sortData(transactions)),
      map((transactions) => this.paginateData(transactions)),
      map((transactions) => {
        return transactions;
      })
    );
  }

  /* Get current sorting */
  getSort() {
    return this.state$.pipe(map((map) => map.sort));
  }

  /* Get current category */
  getCategory() {
    return this.state$.pipe(map((map) => map.category));
  }

  /* Get total pages */
  getTotalPages() {
    return this.totalPages$;
  }

  /* Navigate to a specific page  */
  changePage(currentPage: number) {
    this.state.next({ ...this.state.getValue(), currentPage });
  }

  /* Go to next page as long as its not over total page length */
  incrementPage() {
    let currentPage = this.state.getValue().currentPage;
    let totalPages = this.totalPages.getValue().length;
    currentPage = currentPage + 1;
    if (!(currentPage > totalPages)) {
      this.state.next({ ...this.state.getValue(), currentPage });
    }
  }

  /* Go to previous page as long as its not 0 lol */
  decrementPage() {
    let currentPage = this.state.getValue().currentPage;
    currentPage = currentPage - 1;
    if (!(currentPage < 1)) {
      this.state.next({ ...this.state.getValue(), currentPage });
    }
  }

  /* Update sorting method currently implemented on list */
  updateSort(sort: string) {
    this.state.next({ ...this.state.getValue(), sort });
  }

  /* Update Category */

  updateCategory(category: string) {
    this.state.next({ ...this.state.getValue(), category });
  }

  /* Update Search */
  updateSearch(search: string) {
    this.state.next({ ...this.state.getValue(), search });
  }

  /* Filter search */
  filterSearch(data: Transactions[]) {
    return data.filter((transaction) =>
      transaction.name.toLowerCase().includes(this.state.getValue().search)
    );
  }

  /* Filter Category */
  sortCategory(data: Transactions[]) {
    let category = this.state.getValue().category;
    if (category !== 'All Transactions')
      return data.filter((value) => value.category === category);
    this.generatePageButtons(data);
    return data;
  }

  /* Generate Page Buttons */
  generatePageButtons(data: Transactions[]) {
    // Generate total page count
    this.totalPages.next(this.createArray(Math.ceil(data.length / 10)));
    //If current page is greater than total page numbers revert to page 1
    if (this.state.getValue().currentPage > this.totalPages.getValue().length)
      this.state.next({ ...this.state.getValue(), currentPage: 1 });
  }

  /* Sort transactions */
  sortData(data: Transactions[]) {
    let sortValue = this.state.getValue().sort;
    if (sortValue === 'Latest')
      return data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    else if (sortValue === 'Oldest')
      return data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    else if (sortValue === 'A to Z')
      return data.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortValue === 'Z to A')
      return data.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortValue === 'Highest')
      return data.sort((a, b) => b.amount - a.amount);
    else if (sortValue === 'Lowest')
      return (data = data.sort((a, b) => a.amount - b.amount));
    else return data;
  }

  /*Paginate data*/
  paginateData(transactions: Transactions[]) {
    let page = this.state.getValue().currentPage;
    let limit = 10;
    let start = (page - 1) * 10;
    return transactions.slice(start, start + limit);
  }

  /*Create array*/
  createArray = (num: number) => Array.from({ length: num }, (_, i) => i + 1);
}
