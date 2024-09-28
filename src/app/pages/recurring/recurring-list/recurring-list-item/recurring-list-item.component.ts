import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { addDays, isBefore, isSameDay, parseISO, format } from 'date-fns';
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
    const transactionDate = new Date(this.transaction.date).getDate();
    if (isBefore(transactionDate, today) || today === transactionDate) {
      this.due = DueDate.PAID;
    } else if (isBefore(transactionDate, addDays(today, 3))) {
      this.due = DueDate.UPCOMING;
    } else {
      this.due = DueDate.LATER;
    }
  }
}
