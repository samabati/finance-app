import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Transactions } from '../../../types/transactions';
import Decimal from 'decimal.js';

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
      .getBillsSummary()
      .pipe(take(2))
      .subscribe((transactions) => {
        console.log('TRANSACTIONS: ', transactions);
        let today = new Date().getDate();
        let tempPaid = [];
        let tempDue = [];
        let tempUpcoming = [];
        transactions.map((item: Transactions) => {
          let transDay = new Date(item.date).getDate();
          if (today >= transDay) {
            tempPaid.push(item.amount);
          } else if (today - transDay >= -3) {
            tempDue.push(item.amount);
            this.upcomingBills.push(item.amount);
          } else {
            tempUpcoming.push(item.amount);
          }
          this.paidBills = tempPaid;
          this.dueSoonBills = tempDue;
          this.upcomingBills = tempUpcoming;
        });
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.dueSoonBills = [];
    this.paidBills = [];
    this.upcomingBills = [];
  }

  getPaidTotal() {
    return this.paidBills
      .reduce((a, b) => a.plus(new Decimal(b)), new Decimal(0))
      .abs()
      .toString();
  }

  getUpcomingTotal() {
    return this.upcomingBills
      .reduce((a, b) => a.plus(new Decimal(b)), new Decimal(0))
      .abs()
      .toString();
  }

  getDueSoon() {
    return this.dueSoonBills
      .reduce((a, b) => a.plus(new Decimal(b)), new Decimal(0))
      .abs()
      .toString();
  }
}
