import { Component, inject } from '@angular/core';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { SortByComponent } from '../../../components/shared/sort-by/sort-by.component';
import { RecurringListItemComponent } from './recurring-list-item/recurring-list-item.component';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { CommonModule } from '@angular/common';
import { TransactionSkeletonComponent } from '../../../components/shared/transaction-skeleton/transaction-skeleton/transaction-skeleton.component';

@Component({
  selector: 'app-recurring-list',
  standalone: true,
  imports: [
    SearchBarComponent,
    SortByComponent,
    RecurringListItemComponent,
    CommonModule,
    TransactionSkeletonComponent,
  ],
  templateUrl: './recurring-list.component.html',
  styleUrl: './recurring-list.component.css',
})
export class RecurringListComponent {
  recurringService = inject(RecurringService);

  constructor() {
    this.recurringService.getBills().subscribe((value) => console.log(value));
  }
}
