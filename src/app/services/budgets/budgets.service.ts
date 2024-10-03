import { Injectable } from '@angular/core';
import { Budget } from '../../types/budget';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Theme } from '../../types/theme';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private budgets: BehaviorSubject<Budget[]> = new BehaviorSubject<Budget[]>(
    []
  );

  budgets$: Observable<Budget[]> = this.budgets.asObservable();

  token = 'eyJhbGciOiJIUzI1NiJ9.MQ.SOe1LgGnUiHHaf5bFaE_BNCePG45InyS_0UbS8lb25M';
  baseURL = 'http://localhost:3000/api/v1/budgets';
  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  constructor(private http: HttpClient) {
    this.loadBudgets();
  }

  loadBudgets() {
    this.http
      .get<Budget[]>(this.baseURL, { headers: this.headers })
      .subscribe((budgets) => {
        this.budgets.next(budgets);
        console.log(this.budgets.getValue());
      });
  }

  addBudget(newBudget: Budget) {
    this.http
      .post<Budget>(this.baseURL, newBudget, {
        headers: this.headers,
      })
      .subscribe({
        error: (e) => console.log('An error has occured', e),
        complete: () => {
          this.loadBudgets();
          console.log('Budget added successfully');
        },
      });
  }

  removeBudget(id: number) {
    let tempBudget = this.budgets.getValue();
    tempBudget = tempBudget.filter((value) => value.id !== id);
    this.budgets.next(tempBudget);
    this.http
      .delete<any>(this.baseURL + `/${id}`, { headers: this.headers })
      .subscribe({
        error: (e) => console.log('An error has occured', e),
        complete: () => console.log('Budget deleted successfully'),
      });
  }

  getBudget(id: number) {
    return this.budgets.getValue().find((budget) => budget.id === id);
  }

  getThemes() {
    return this.budgets$.pipe(
      map((budgets) => budgets.map((budget) => budget.theme))
    );
  }

  updateBudget(updates: Partial<Budget>, id: number) {
    const budgets = this.budgets.getValue();
    const budgetIndex = budgets.findIndex((budget) => budget.id === id);

    if (budgetIndex) {
      budgets[budgetIndex] = { ...budgets[budgetIndex], ...updates };
      this.budgets.next(budgets);
      this.http
        .patch<any>(this.baseURL + `/${id}`, updates, { headers: this.headers })
        .subscribe({
          error: (e) => console.log('An error has occured', e),
          complete: () => console.log('Budget deleted successfully'),
        });
    }
  }
}
