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
  /* This is the list of page numbers */
  transactionService = inject(TransactionsService);
  screenWidth!: number;
  mobileList: boolean = false;
  mobileArray!: Array<any>;
  totalPages!: number;
  pageNumber!: number;
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

    this.subscription.add(
      this.transactionService.totalPages$.subscribe((value) => {
        this.totalPages = value.length;
        this.generateMobileArray();
      })
    );

    this.subscription.add(
      this.transactionService.pageNumber$.subscribe((value) => {
        this.pageNumber = value;
        this.generateMobileArray();
      })
    );
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

  generateMobileArray() {
    console.log(this.pageNumber);
    let pageNumber = this.pageNumber;
    if (pageNumber === 1) {
      this.mobileArray = [1, 2, 'e', this.totalPages];
      console.log(this.mobileArray);
    } else if (
      pageNumber == this.totalPages ||
      pageNumber == this.totalPages - 1 ||
      pageNumber == this.totalPages - 2 ||
      pageNumber == this.totalPages - 3
    ) {
      this.mobileArray = [
        this.totalPages - 3,
        this.totalPages - 2,
        this.totalPages - 1,
        this.totalPages,
      ];
    } else {
      this.mobileArray = [pageNumber, pageNumber + 1, 'e', this.totalPages];
    }
  }

  shiftArray() {
    this.transactionService.incrementPage();
    /*
    let newArr = [
      this.mobileArray[0] + 1,
      this.mobileArray[1] + 1,
      this.mobileArray[1] + 2,
      this.totalPages,
    ];
    if (newArr[2] !== Number(this.totalPages) - 1) {
      newArr[2] = 'e';
    }
    this.mobileArray = newArr;
    */
  }
}
