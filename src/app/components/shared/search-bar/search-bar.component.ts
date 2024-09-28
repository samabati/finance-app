import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RecurringService } from '../../../services/recurring/recurring.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { TransactionsService } from '../../../services/transactions/transactions.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() type!: string;
  recurringService = inject(RecurringService);
  transactionService = inject(TransactionsService);
  inputSearch = '';
  subscription!: Subscription;
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      inputField: [''],
    });
  }

  ngOnInit(): void {
    this.subscription = this.searchForm
      .get('inputField')!
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        console.log('HELLO:', value);
        this.updateSearch(value);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateSearch(searchTerm: string) {
    if (this.type === 'bills') {
      this.recurringService.updateSearch(searchTerm.toLowerCase());
    } else if (this.type === 'transactions') {
      this.transactionService.updateSearch(searchTerm.toLowerCase());
    }
  }
}
