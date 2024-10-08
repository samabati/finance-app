import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import Decimal from 'decimal.js';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-total-bills',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './total-bills.component.html',
  styleUrl: './total-bills.component.css',
})
export class TotalBillsComponent implements OnInit, OnDestroy {
  total!: Decimal;
  recurringService = inject(RecurringService);
  subscriptions = new Subscription();
  loading = true;

  ngOnInit(): void {
    this.getTotal();
    this.getLoading();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getTotal() {
    this.subscriptions.add(
      this.recurringService.getBillsSummary().subscribe((value) => {
        console.log('VALUE', value);
        this.total = value
          .reduce((a, b) => a.plus(new Decimal(b.amount)), new Decimal(0))
          .abs();
      })
    );
  }

  getLoading() {
    this.subscriptions.add(
      this.recurringService.state$
        .pipe(map((state) => state.loading))
        .subscribe((loading) => {
          this.loading = loading;
          if (loading === false) this.subscriptions.unsubscribe();
        })
    );
  }
}
