import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay, take, tap } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

interface State {
  bills: Transactions[];
  sort: string;
  search: string;
  loading: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class RecurringService {
  private state: BehaviorSubject<State> = new BehaviorSubject<State>({
    bills: [],
    sort: 'Latest',
    search: '',
    loading: true,
  });

  state$ = this.state.asObservable();

  constructor(private http: HttpClient) {
    setTimeout(() => this.loadBills(), 3000);
  }

  token = 'eyJhbGciOiJIUzI1NiJ9.MQ.SOe1LgGnUiHHaf5bFaE_BNCePG45InyS_0UbS8lb25M';
  baseURL = 'http://localhost:3000/api/v1/transactions/recurring';
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  loadBills() {
    this.updateLoading(true);
    let params = new HttpParams()
      .set('search', this.state.getValue().search)
      .set('sort', this.state.getValue().sort);
    this.http
      .get<Transactions[]>(this.baseURL, {
        headers: this.headers,
        params: params,
      })
      .subscribe({
        next: (bills) => {
          console.log('Loaded bills successfully:', bills);
          this.state.next({
            ...this.state.getValue(),
            bills: bills,
            loading: false,
          });
        },
        error: (e) => {
          console.log('Error loading bills:', e);
          this.updateLoading(false);
        },
      });
  }

  getSort() {
    return this.state$.pipe(map((state) => state.sort));
  }

  getBills() {
    return this.state$.pipe(map((state) => state.bills));
  }

  updateSort(sort: string) {
    this.state.next({
      ...this.state.getValue(),
      sort,
    });
    console.log('SORT VALUE', this.state.getValue().sort);
    this.loadBills();
  }

  updateSearch(search: string) {
    this.state.next({
      ...this.state.getValue(),
      search,
    });
    this.loadBills();
  }

  getBillsSummary() {
    return this.state.pipe(
      take(3),
      map((value) => value.bills)
    );
  }

  updateLoading(loading: boolean) {
    this.state.next({ ...this.state.getValue(), loading });
  }
}
