import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient } from '@angular/common/http';

interface State {
  bills: Transactions[];
  sort: string;
}
@Injectable({
  providedIn: 'root',
})
export class RecurringService {
  private bills: BehaviorSubject<State> = new BehaviorSubject<State>({
    bills: [],
    sort: 'Latest',
  });

  http = inject(HttpClient);

  constructor() {
    this.loadBills();
  }

  loadBills() {
    this.http
      .get<any>('assets/data/data.json')
      .pipe(
        take(1),
        map((data) => data.transactions)
      )
      .subscribe((value) => {
        this.bills.next({
          bills: value.filter((item: Transactions) => item.recurring == true),
          sort: 'Latest',
        });
      });
  }

  getSort() {
    return this.bills.pipe(map((value) => value.sort));
  }

  getBills() {
    return this.bills.pipe(map((value) => this.sortBills(value.bills)));
  }

  updateSort(sort: string) {
    this.bills.next({ bills: this.bills.getValue().bills, sort });
  }

  sortBills(bills: Transactions[]): Transactions[] {
    let data = bills;
    let sortValue = this.bills.getValue().sort;
    if (sortValue === 'Latest')
      return data.sort(
        (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
      );
    else if (sortValue === 'Oldest')
      return data.sort(
        (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate()
      );
    else if (sortValue === 'A to Z')
      return data.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortValue === 'Z to A')
      return data.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortValue === 'Highest')
      return data.sort((a, b) => a.amount - b.amount);
    else if (sortValue === 'Lowest')
      return (data = data.sort((a, b) => b.amount - a.amount));
    return data;
  }
}
