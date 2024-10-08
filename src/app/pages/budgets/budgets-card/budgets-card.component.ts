import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BudgetsCardItemComponent } from './budgets-card-item/budgets-card-item.component';
import { CommonModule } from '@angular/common';
import { Budget } from '../../../types/budget';
import { EllipsesComponent } from '../../../components/shared/ellipses/ellipses.component';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Subscription } from 'rxjs';
import { Transactions } from '../../../types/transactions';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { TransactionSkeletonComponent } from '../../../components/shared/transaction-skeleton/transaction-skeleton/transaction-skeleton.component';

@Component({
  selector: 'app-budgets-card',
  standalone: true,
  imports: [
    BudgetsCardItemComponent,
    CommonModule,
    EllipsesComponent,
    SkeletonModule,
    TransactionSkeletonComponent,
  ],
  templateUrl: './budgets-card.component.html',
  styleUrl: './budgets-card.component.css',
})
export class BudgetsCardComponent implements OnInit, OnDestroy {
  @Input() budget!: Budget;
  @Input() id!: number;
  cardTransactions: Transactions[] = [];
  transactionService = inject(TransactionsService);
  router = inject(Router);
  subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.transactionService
      .fetchTransactions(this.budget.category)
      .subscribe((value) => (this.cardTransactions = value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToTransactions() {
    this.router.navigateByUrl('/transactions');
  }
}
