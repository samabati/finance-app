import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

interface State {
  transactions: Transactions[];
  sort: string;
  category: string;
  search: string;
  loading: boolean;
}

interface PageState {
  totalPages: number[];
  currentPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  /* State */
  private state: BehaviorSubject<State> = new BehaviorSubject<State>({
    transactions: [],
    sort: 'Latest',
    category: 'All Transactions',
    search: '',
    loading: true,
  });

  state$ = this.state.asObservable();

  /* Page states (must be separate from transaction state)*/
  private pageState: BehaviorSubject<PageState> =
    new BehaviorSubject<PageState>({
      totalPages: [],
      currentPage: 1,
    });

  pageState$ = this.pageState.asObservable();

  http = inject(HttpClient);

  constructor() {
    setTimeout(() => {
      this.loadTransactions();
    }, 10000000);
  }

  /* Load transactions for transactions page*/
  loadTransactions() {
    this.updateLoading(true);
    let params = new HttpParams()
      .set('category', this.state.getValue().category)
      .set('page', this.pageState.getValue().currentPage)
      .set('search', this.state.getValue().search)
      .set('sort', this.state.getValue().sort);

    let token =
      'eyJhbGciOiJIUzI1NiJ9.Mg.eMPD7SfMyy4TR_tWbu_2YkGyIldC1MsQKO26AJj5AvI';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http
      .get<any>('http://localhost:3000/api/v1/transactions', {
        params: params,
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.generatePageButtons(data.totalPages);
          return data.transactions;
        })
      )
      .subscribe((transactions) => {
        this.state.next({ ...this.state.getValue(), transactions });
        this.updateLoading(false);
      });
  }

  /* Transactions displayed on transactions page */
  getTransactions() {
    return this.state$.pipe(map((state) => state.transactions));
  }

  /* Get loading state */
  getLoading() {
    return this.state$.pipe(map((state) => state.loading));
  }

  /* Transactions displayed on budgets page card*/
  fetchTransactions(category: string) {
    let params = new HttpParams()
      .set('category', category)
      .set('page', 1)
      .set('sort', 'All Transactions')
      .set('search', '');

    let token =
      'eyJhbGciOiJIUzI1NiJ9.Mg.eMPD7SfMyy4TR_tWbu_2YkGyIldC1MsQKO26AJj5AvI';
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http
      .get<any>('http://localhost:3000/api/v1/transactions', {
        params: params,
        headers: headers,
      })
      .pipe(map((res) => res.transactions));
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
    return this.pageState$.pipe(map((state) => state.totalPages));
  }

  /* Refresh transactions list (Called after a change is made)*/
  refreshTransactions() {
    this.loadTransactions();
  }

  /* Navigate to a specific page  */
  changePage(currentPage: number) {
    this.pageState.next({ ...this.pageState.getValue(), currentPage });
    this.refreshTransactions();
  }

  /* Go to next page as long as its not over total page length */
  incrementPage() {
    let currentPage = this.pageState.getValue().currentPage;
    let totalPages = this.pageState.getValue().totalPages.length;
    currentPage = currentPage + 1;
    if (!(currentPage > totalPages)) {
      this.pageState.next({ ...this.pageState.getValue(), currentPage });
    }
    this.refreshTransactions();
  }

  /* Go to previous page as long as its not 0 lol */
  decrementPage() {
    let currentPage = this.pageState.getValue().currentPage;
    currentPage = currentPage - 1;
    if (!(currentPage < 1)) {
      this.pageState.next({ ...this.pageState.getValue(), currentPage });
    }
    this.refreshTransactions();
  }

  /* Update sorting method currently implemented on list */
  updateSort(sort: string) {
    this.state.next({ ...this.state.getValue(), sort });
    this.refreshTransactions();
  }

  /*Update loading state*/
  updateLoading(loading: boolean) {
    this.state.next({ ...this.state.getValue(), loading });
  }

  /* Update Category */

  updateCategory(category: string) {
    this.state.next({ ...this.state.getValue(), category });
    this.pageState.next({ ...this.pageState.getValue(), currentPage: 1 });
    this.refreshTransactions();
  }

  /* Update Search */
  updateSearch(search: string) {
    this.state.next({ ...this.state.getValue(), search });
    this.pageState.next({ ...this.pageState.getValue(), currentPage: 1 });
    this.refreshTransactions();
  }

  /* Generate Page Buttons */
  generatePageButtons(data: number) {
    console.log('DATA:', data);
    if (data !== this.pageState.getValue().totalPages.length) {
      console.log('DATA:', data);
      // Generate total page count
      this.pageState.next({
        ...this.pageState.getValue(),
        totalPages: this.createArray(Math.ceil(data / 10)),
      });
    }
  }

  /*Create array*/
  createArray = (num: number) => Array.from({ length: num }, (_, i) => i + 1);
}
