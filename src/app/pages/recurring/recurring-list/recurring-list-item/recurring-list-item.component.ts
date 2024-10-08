import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  due!: DueDate;

  constructor() {}

  ngOnInit(): void {
    this.loadDueDate();
  }

  formatDate() {
    return format(this.transaction.date, "'Monthly - 'do");
  }

  loadDueDate() {
    const today = new Date().getDate();
    const transDay = new Date(this.transaction.date).getDate();
    if (today >= transDay) {
      this.due = DueDate.PAID;
    } else if (today - transDay >= -3) {
      this.due = DueDate.UPCOMING;
    } else {
      this.due = DueDate.LATER;
    }
  }
}
