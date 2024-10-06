import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AddBudgetsComponent } from './add-budgets/add-budgets.component';
import { BudgetsSummaryComponent } from './budgets-summary/budgets-summary.component';
import { BudgetsCardComponent } from './budgets-card/budgets-card.component';
import { RouterOutlet } from '@angular/router';
import { BudgetsService } from '../../services/budgets/budgets.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    AddBudgetsComponent,
    BudgetsSummaryComponent,
    BudgetsCardComponent,
    RouterOutlet,
    CommonModule,
    SkeletonModule,
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css',
})
export class BudgetsComponent implements OnInit, OnDestroy {
  budgetService = inject(BudgetsService);
  subscription!: Subscription;
  loading = true;

  ngOnInit(): void {
    this.subscription = this.budgetService.loading$.subscribe((value) => {
      this.loading = value;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
