import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-number.component.html',
  styleUrl: './page-number.component.css',
})
export class PageNumberComponent implements OnInit, OnDestroy {
  @Input() number!: Number;
  selected!: Number;
  transactionService = inject(TransactionsService);
  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.transactionService.pageNumber$.subscribe(
      (value) => (this.selected = value)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick() {
    this.transactionService.changePage(this.number);
  }
}
