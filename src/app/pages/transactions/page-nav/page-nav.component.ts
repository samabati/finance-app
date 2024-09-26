import { Component, inject, Input } from '@angular/core';
import { TransactionsService } from '../../../services/transactions/transactions.service';

@Component({
  selector: 'app-page-nav',
  standalone: true,
  imports: [],
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.css',
})
export class PageNavComponent {
  @Input() type!: string;
  transactionService = inject(TransactionsService);

  onClick() {
    if (this.type === 'prev') {
      this.transactionService.decrementPage();
    } else if (this.type === 'next') {
      this.transactionService.incrementPage();
    }
  }
}
