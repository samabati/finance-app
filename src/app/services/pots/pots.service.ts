import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pot } from '../../types/pot';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PotsService {
  private pots: BehaviorSubject<Pot[]> = new BehaviorSubject<Pot[]>([]);
  pots$: Observable<Pot[]> = this.pots.asObservable();

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  loading$ = this.loading.asObservable();
  baseURL = `${environment.apiUrl}/api/v1/pots`;

  constructor(private http: HttpClient) {
    this.loadPots();
  }

  /* Load all pots */
  loadPots() {
    this.loading.next(true);
    this.http.get<Pot[]>(this.baseURL).subscribe({
      next: (pots: Pot[]) => {
        console.log('Pots loaded successfully', pots);
        this.pots.next(pots);
        this.loading.next(false);
      },
      error: (e) => {
        console.log('Error loading pots!', e);
        this.loading.next(false);
      },
    });
  }

  /* Refresh pots state */
  refreshPots() {
    this.loadPots();
  }

  /* Add pot */
  addPot(pot: Pot) {
    this.http.post<any>(this.baseURL, pot).subscribe({
      next: (res) => {
        console.log('Pot added successfully!', res);
        this.refreshPots();
      },
      error: (e) => console.log('Error loading pots', e),
    });
  }

  getPot(id: number) {
    return this.pots.getValue().find((pot) => pot.id === id);
  }

  editPot(updates: Partial<Pot>, id: number) {
    let pots = this.pots.getValue();
    let index = pots.findIndex((pot) => pot.id === id);
    this.http.patch<any>(this.baseURL + `/${id}`, updates).subscribe({
      next: (res) => {
        console.log('Pot edited successfully:', res);
        pots[index] = { ...pots[index], ...updates };
        this.pots.next(pots);
      },
      error: (e) => {
        console.log('Error editing pot', e);
      },
    });
  }

  removePot(id: number) {
    this.http.delete<any>(this.baseURL + `/${id}`).subscribe({
      next: (res) => {
        console.log('Pot deleted successfully', res);
        let pots = this.pots.getValue().filter((pot) => pot.id !== id);
        this.pots.next(pots);
      },
      error: (e) => console.log('Error occured trying to delete pot', e),
    });
  }

  getTotalSaved(): number {
    return this.pots.getValue().reduce((prev, curr) => prev + curr.saved, 0);
  }

  getThemes() {
    return this.pots$.pipe(map((pots) => pots.map((pot) => pot.theme)));
  }

  addFunds(id: number, saved: number) {
    let pots = this.pots.getValue();
    let index = pots.findIndex((pot) => pot.id === id);
    this.http.patch<any>(this.baseURL + `/${id}/add`, { saved }).subscribe({
      next: (res) => {
        console.log('Funds added successfully:', res);
        pots[index] = { ...pots[index], saved };
        this.pots.next(pots);
      },
      error: (e) => console.log('Error adding funds', e),
    });
  }

  withdrawFunds(id: number, saved: number) {
    let pots = this.pots.getValue();
    let index = pots.findIndex((pot) => pot.id === id);
    this.http
      .patch<any>(this.baseURL + `/${id}/withdraw`, { saved })
      .subscribe({
        next: (res) => {
          console.log('Funds withdrawn successfully:', res);
          pots[index] = { ...pots[index], saved };
          this.pots.next(pots);
        },
        error: (e) => console.log('Error withdrawing funds', e),
      });
  }
}
