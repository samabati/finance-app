import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-by.component.html',
  styleUrl: './sort-by.component.css',
})
export class SortByComponent implements OnInit {
  @Input() type!: string;
  selected!: string;
  showContent: boolean = false;
  options!: Array<string>;
  maxWidth!: string;

  ngOnInit(): void {
    if (this.type === 'Sort By') {
      this.selected = 'Latest';
      this.options = [
        'Latest',
        'Oldest',
        'A to Z',
        'Z to A',
        'Highest',
        'Lowest',
      ];
      this.maxWidth = '113px';
    } else if (this.type === 'Category') {
      this.selected = 'All Transactions';
      this.options = [
        'All Transactions',
        'Entertainment',
        'Bills',
        'Groceries',
        'Dining Out',
        'Transportation',
        'Personal Care',
      ];
      this.maxWidth = '179px';
    }
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }

  select(str: string) {
    this.selected = str;
  }
}
