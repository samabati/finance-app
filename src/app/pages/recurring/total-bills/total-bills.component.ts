import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-bills.component.html',
  styleUrl: './total-bills.component.css',
})
export class TotalBillsComponent implements OnInit, OnDestroy {
  total!: number;
  recurringService = inject(RecurringService);
  subscriptions!: Subscription;

  ngOnInit(): void {
    this.subscriptions = this.recurringService.getBills().subscribe((value) => {
      this.total = Math.abs(value.reduce((a, b) => a + b.amount, 0));
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
