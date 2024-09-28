import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pot } from '../../types/pot';

@Injectable({
  providedIn: 'root',
})
export class PotsService {
  private pots: BehaviorSubject<Pot[]> = new BehaviorSubject<Pot[]>([
    {
      name: 'Savings',
      saved: 150,
      target: 2000,
      theme: { name: 'Green', class: 'bg-g', color: '#277C78' },
    },
    {
      name: 'Concert Ticket',
      saved: 110,
      target: 150,
      theme: { name: 'Navy', class: 'bg-navy', color: '#626070' },
    },
    {
      name: 'Gift',
      saved: 40,
      target: 60,
      theme: { name: 'Cyan', class: 'bg-cyan', color: '#82C9D7' },
    },
    {
      name: 'New Laptop',
      saved: 10,
      target: 1000,
      theme: { name: 'Yellow', class: 'bg-yellow', color: '#F2CDAC' },
    },
    {
      name: 'Holiday',
      saved: 531,
      target: 1440,
      theme: { name: 'Purple', class: 'bg-purple', color: '#826CB0' },
    },
  ]);

  pots$: Observable<Pot[]> = this.pots.asObservable();

  constructor() {}

  addPot(pot: Pot) {
    let tempPots = this.pots.getValue();
    tempPots.push(pot);
    this.pots.next(tempPots);
  }

  getPot(index: number) {
    return this.pots.getValue()[index];
  }

  editPot(updates: Partial<Pot>, index: number) {
    let pots = this.pots.getValue();
    pots[index] = { ...pots[index], ...updates };
    this.pots.next(pots);
  }

  removePot(index: number) {
    let newPots = this.pots.getValue().filter((value, i) => i !== index);
    this.pots.next(newPots);
  }

  getTotalSaved(): number {
    return this.pots.getValue().reduce((prev, curr) => prev + curr.saved, 0);
  }

  getThemes() {
    return this.pots$.pipe(map((pots) => pots.map((pot) => pot.theme)));
  }
}
