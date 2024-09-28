import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay, take } from 'rxjs';
import { Transactions } from '../../types/transactions';
import { HttpClient } from '@angular/common/http';

interface State {
  bills: Transactions[];
  sort: string;
  search: string;
}
@Injectable({
  providedIn: 'root',
})
export class RecurringService {
  private bills: BehaviorSubject<State> = new BehaviorSubject<State>({
    bills: [],
    sort: 'Latest',
    search: '',
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
        map((data) => data.transactions),
        map((transactions: Transactions[]) =>
          // Remove duplicates
          transactions.filter(
            (item, index, self) =>
              index === self.findIndex((o) => o.name === item.name)
          )
        )
      )
      .subscribe((value) => {
        this.bills.next({
          bills: value.filter((item: Transactions) => item.recurring == true),
          sort: 'Latest',
          search: '',
        });
      });
  }

  getSort() {
    return this.bills.pipe(map((value) => value.sort));
  }

  getBills() {
    return this.bills.pipe(
      map((value) => this.searchBills(value.bills)),
      map((value) => this.sortBills(value))
    );
  }

  updateSort(sort: string) {
    this.bills.next({
      ...this.bills.getValue(),
      sort,
    });
  }

  updateSearch(search: string) {
    this.bills.next({
      ...this.bills.getValue(),
      search,
    });
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

  searchBills(bills: Transactions[]): Transactions[] {
    return bills.filter((bill) =>
      bill.name.toLowerCase().includes(this.bills.getValue().search)
    );
  }

  getBillsSummary() {
    return this.bills.pipe(
      take(2),
      map((value) => value.bills)
    );
  }
}
