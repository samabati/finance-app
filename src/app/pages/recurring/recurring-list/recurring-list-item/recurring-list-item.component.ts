import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Transactions } from '../../../../types/transactions';

export enum DueDate {
  PAID = 'PAID',
  UPCOMING = 'UPCOMING',
  LATER = 'LATER',
}

@Component({
  selector: 'app-recurring-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recurring-list-item.component.html',
  styleUrl: './recurring-list-item.component.css',
})
export class RecurringListItemComponent implements OnInit {
  @Input() transaction!: Transactions;
  currentTime = new Date();
  due!: DueDate;

  constructor() {}

  ngOnInit(): void {
    let currDay = this.currentTime.getDate();
    let transDay = new Date(this.transaction.date).getDate();
    if (currDay >= transDay) {
      this.due = DueDate.PAID;
    } else if (currDay - transDay >= -3) {
      this.due = DueDate.UPCOMING;
    } else {
      this.due = DueDate.LATER;
    }
  }

  formatDate() {
    return format(this.transaction.date, "'Monthly - 'do");
  }
}
