import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
      theme: { name: 'Green', class: 'bg-g' },
    },
    {
      name: 'Concert Ticket',
      saved: 110,
      target: 150,
      theme: { name: 'Navy', class: 'bg-navy' },
    },
    {
      name: 'Gift',
      saved: 40,
      target: 60,
      theme: { name: 'Cyan', class: 'bg-cyan' },
    },
    {
      name: 'New Laptop',
      saved: 10,
      target: 1000,
      theme: { name: 'Yellow', class: 'bg-yellow' },
    },
    {
      name: 'Holiday',
      saved: 531,
      target: 1440,
      theme: { name: 'Purple', class: 'bg-purple' },
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
}
