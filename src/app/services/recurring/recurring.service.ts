import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    this.loadBills();
  }

  baseURL = `${environment.apiUrl}/api/v1/transactions/recurring`;

  loadBills() {
    this.updateLoading(true);
    let params = new HttpParams()
      .set('search', this.state.getValue().search)
      .set('sort', this.state.getValue().sort);
    this.http
      .get<Transactions[]>(this.baseURL, {
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

  getLoading() {
    return this.state$.pipe(map((state) => state.loading));
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
