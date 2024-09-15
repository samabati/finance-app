import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'chart.js/helpers';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactions: BehaviorSubject<Transactions[]> = new BehaviorSubject<
    Transactions[]
  >([]);
  transactions$ = this.transactions.asObservable();
  dataLoaded = false;

  http = inject(HttpClient);

  constructor() {
    this.loadTransactions();
  }

  loadTransactions(): Promise<boolean> {
    return new Promise((resolve) => {
      console.log('load Transactions ran');
      this.http
        .get<any>('/assets/data/data.json')
        .pipe(map((value) => value.transactions))
        .subscribe((value) => {
          this.transactions.next(value);
          this.dataLoaded = true;
          resolve(true);
        });
    });
  }

  getTransactions(page: number = 1) {
    let limit = 10;
    let start = (page - 1) * 10;
    return this.http.get<any>('/assets/data/data.json').pipe(
      map((value) => value.transactions),
      map((value) => value.slice(start, start + limit))
    );
  }
}
