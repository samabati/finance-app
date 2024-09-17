import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { PageNumberComponent } from '../page-number/page-number.component';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-page-number-list',
  standalone: true,
  imports: [PageNumberComponent, CommonModule],
  templateUrl: './page-number-list.component.html',
  styleUrl: './page-number-list.component.css',
})
export class PageNumberListComponent implements OnInit, OnDestroy {
  transactionService = inject(TransactionsService);
  screenWidth!: number;
  mobileList: boolean = false;
  subscription!: Subscription;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.updateMobileList();

    this.subscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.screenWidth = window.innerWidth;
        this.updateMobileList();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateMobileList() {
    if (this.screenWidth <= 754) {
      this.mobileList = true;
    } else if (this.mobileList == true) {
      this.mobileList = false;
    }
  }
}
