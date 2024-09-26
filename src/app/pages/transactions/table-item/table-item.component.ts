import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
  providers: [CurrencyPipe],
})
export class TableItemComponent implements OnInit {
  @Input() src!: string;
  @Input() name!: string;
  @Input() category!: string;
  @Input() date!: string;
  @Input() amount!: string;
  positive!: boolean;

  currencyPipe = inject(CurrencyPipe);

  ngOnInit(): void {
    this.positive = Number(this.amount) > 0;
  }

  formatCurrency() {
    const formattedValue = this.currencyPipe.transform(this.amount);
    return Number(this.amount) > 0 ? `+${formattedValue}` : formattedValue;
  }
}
