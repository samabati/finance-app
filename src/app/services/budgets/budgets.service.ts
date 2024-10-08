import { inject, Injectable } from '@angular/core';
import { Budget } from '../../types/budget';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private budgets: BehaviorSubject<Budget[]> = new BehaviorSubject<Budget[]>(
    []
  );
  budgets$: Observable<Budget[]> = this.budgets.asObservable();

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  loading$ = this.loading.asObservable();

  baseURL = `${environment.apiUrl}/api/v1/budgets`;

  authService = inject(AuthService);

  constructor(private http: HttpClient) {
    this.loadBudgets();
  }

  loadBudgets() {
    this.loading.next(true);
    this.http.get<Budget[]>(this.baseURL).subscribe((budgets) => {
      this.budgets.next(budgets);
      console.log(this.budgets.getValue());
      this.loading.next(false);
    });
  }

  addBudget(newBudget: Budget) {
    if (this.authService.getDemo()) {
      this.demoAdd(newBudget);
    } else {
      this.http.post<Budget>(this.baseURL, newBudget).subscribe({
        error: (e) => console.log('An error has occurred', e),
        complete: () => {
          this.loadBudgets();
          console.log('Budget added successfully');
        },
      });
    }
  }

  demoAdd(newBudget: Budget) {
    this.loading.next(true);
    this.budgets.next([...this.budgets.getValue(), { ...newBudget, id: 0 }]);
    this.loading.next(false);
  }

  removeBudget(id: number) {
    if (this.authService.getDemo()) {
      this.demoRemove(id);
    } else {
      this.loading.next(true);
      let tempBudget = this.budgets.getValue();
      tempBudget = tempBudget.filter((value) => value.id !== id);
      this.http.delete<any>(this.baseURL + `/${id}`).subscribe({
        next: () => {
          console.log('Budget deleted successfully');
          this.budgets.next(tempBudget);
          this.loading.next(false);
        },
        error: (e) => {
          console.log('An error has occurred', e), this.loading.next(false);
        },
      });
    }
  }

  demoRemove(id: number) {
    this.loading.next(true);
    let newBudgets: Budget[] = this.budgets
      .getValue()
      .filter((budget) => budget.id !== id);
    this.budgets.next(newBudgets);
    this.loading.next(false);
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
    if (this.authService.getDemo()) {
      this.demoUpdate(updates, id);
    } else {
      this.loading.next(true);
      const budgets = this.budgets.getValue();
      const budgetIndex = budgets.findIndex((budget) => budget.id === id);
      budgets[budgetIndex] = { ...budgets[budgetIndex], ...updates };
      this.http.patch<any>(this.baseURL + `/${id}`, updates).subscribe({
        next: () => {
          console.log('Budget deleted successfully');
          this.budgets.next(budgets);
          this.loading.next(false);
        },
        error: (e) => {
          console.log('An error has occurred', e);
          this.loading.next(false);
        },
      });
    }
  }

  demoUpdate(updates: Partial<Budget>, id: number) {
    this.loading.next(true);
    const budgets = this.budgets.getValue();
    const budgetIndex = budgets.findIndex((budget) => budget.id === id);
    budgets[budgetIndex] = { ...budgets[budgetIndex], ...updates };
    this.budgets.next(budgets);
    this.loading.next(false);
  }
}
