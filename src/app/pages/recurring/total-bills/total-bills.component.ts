import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-total-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-bills.component.html',
  styleUrl: './total-bills.component.css',
})
export class TotalBillsComponent implements OnInit, OnDestroy {
  total!: Decimal;
  recurringService = inject(RecurringService);
  subscriptions!: Subscription;

  ngOnInit(): void {
    this.subscriptions = this.recurringService
      .getBillsSummary()
      .subscribe((value) => {
        this.total = value
          .reduce((a, b) => a.plus(new Decimal(b.amount)), new Decimal(0))
          .abs();
        console.log('total:', this.total);
      });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
