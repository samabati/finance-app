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
      theme: { name: 'Green', class: 'bg-g' },
    },
    {
      category: 'Bills',
      spent: 150,
      max: 750,
      theme: { name: 'Cyan', class: 'bg-cyan' },
    },
    {
      category: 'Dining Out',
      spent: 133.75,
      max: 75,
      theme: { name: 'Yellow', class: 'bg-yellow' },
    },
    {
      category: 'Personal Care',
      spent: 40,
      max: 100,
      theme: { name: 'Navy', class: 'bg-navy' },
    },
  ]);

  budgets$: Observable<Budget[]> = this.budgets.asObservable();

  constructor() {}

  addBudget(newBudget: Budget) {
    let tempBudget = this.budgets.getValue();
    tempBudget.push(newBudget);
    this.budgets.next(tempBudget);
    console.log('New Budget list: ', this.budgets.getValue());
  }

  removeBudget(index: number) {
    let tempBudget = this.budgets.getValue();
    tempBudget = tempBudget.filter((value, i) => i !== index);
    this.budgets.next(tempBudget);
  }

  getBudget(index: number) {
    return this.budgets.getValue()[index];
  }

  updateBudget(updates: Partial<Budget>, index: number) {
    const budgets = this.budgets.getValue();
    const budget = { ...budgets[index], ...updates };
    budgets[index] = budget;
    this.budgets.next(budgets);
  }
}
