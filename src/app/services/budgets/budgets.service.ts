import { Injectable } from '@angular/core';
import { Budget } from '../../types/budget';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private budgets: BehaviorSubject<Budget[]> = new BehaviorSubject<Budget[]>([
    {
      category: 'Entertainment',
      spent: 15,
      max: 50,
    },
    {
      category: 'Bills',
      spent: 150,
      max: 750,
    },
    {
      category: 'Dining Out',
      spent: 133.75,
      max: 75,
    },
    {
      category: 'Personal Care',
      spent: 40,
      max: 100,
    },
  ]);

  budgets$: Observable<Budget[]> = this.budgets.asObservable();

  constructor() {}

  addBudget(newBudget: Budget) {
    let tempBudget = this.budgets.getValue();
    tempBudget.push(newBudget);
    this.budgets.next(tempBudget);
  }

  removeBudget(oldBudget: Budget) {
    let tempBudget = this.budgets.getValue();
    tempBudget.filter((budget) => budget !== oldBudget);
    this.budgets.next(tempBudget);
  }
}
