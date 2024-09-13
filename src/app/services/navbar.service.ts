import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import NavItems from '../types/navItems';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private navStatus: BehaviorSubject<NavItems> = new BehaviorSubject<NavItems>(
    NavItems.OVERVIEW
  );
  navStatus$ = this.navStatus.asObservable();

  constructor() {}

  setNavStatus(status: NavItems) {
    this.navStatus.next(status);
  }
}
