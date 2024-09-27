import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Transactions } from '../../../types/transactions';

@Component({
  selector: 'app-recurring-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recurring-summary.component.html',
  styleUrl: './recurring-summary.component.css',
})
export class RecurringSummaryComponent implements OnInit, OnDestroy {
  paidBills: Array<number> = [];
  upcomingBills: Array<number> = [];
  dueSoonBills: Array<number> = [];
  recurringService = inject(RecurringService);
  subscriptions!: Subscription;

  ngOnInit(): void {
    this.subscriptions = this.recurringService
      .getBills()
      .pipe(take(2))
      .subscribe((transactions) => {
        console.log('TRANSACTIONS: ', transactions);
        let today = new Date().getDate();
        transactions.map((item: Transactions) => {
          let transDay = new Date(item.date).getDate();
          if (today >= transDay) {
            this.paidBills.push(item.amount);
          } else if (today - transDay >= -3) {
            this.dueSoonBills.push(item.amount);
            this.upcomingBills.push(item.amount);
          } else {
            this.upcomingBills.push(item.amount);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getPaidTotal() {
    return Math.abs(this.paidBills.reduce((a, b) => a + b, 0));
  }

  getUpcomingTotal() {
    return Math.abs(this.upcomingBills.reduce((a, b) => a + b, 0));
  }

  getDueSoon() {
    return Math.abs(this.dueSoonBills.reduce((a, b) => a + b, 0));
  }
}
