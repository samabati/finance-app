import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BudgetsCardItemComponent } from './budgets-card-item/budgets-card-item.component';
import { CommonModule } from '@angular/common';
import { Budget } from '../../../types/budget';
import { EllipsesComponent } from '../../../components/shared/ellipses/ellipses.component';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Transactions } from '../../../types/transactions';

@Component({
  selector: 'app-budgets-card',
  standalone: true,
  imports: [BudgetsCardItemComponent, CommonModule, EllipsesComponent],
  templateUrl: './budgets-card.component.html',
  styleUrl: './budgets-card.component.css',
})
export class BudgetsCardComponent implements OnInit, OnDestroy {
  @Input() budget!: Budget;
  @Input() index!: number;
  cardTransactions: Transactions[] = [];
  transactionService = inject(TransactionsService);
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.transactionService.transactions$
      .pipe(
        map((trans) =>
          trans.filter((trans) => trans.category == this.budget.category)
        )
      )
      .subscribe((value) => (this.cardTransactions = value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
