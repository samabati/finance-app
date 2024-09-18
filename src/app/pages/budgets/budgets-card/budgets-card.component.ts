import { Component, Input, OnInit } from '@angular/core';
import { BudgetsCardItemComponent } from './budgets-card-item/budgets-card-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets-card',
  standalone: true,
  imports: [BudgetsCardItemComponent, CommonModule],
  templateUrl: './budgets-card.component.html',
  styleUrl: './budgets-card.component.css',
})
export class BudgetsCardComponent implements OnInit {
  @Input() category!: string;
  @Input() spent!: number;
  @Input() max!: number;
  bgColor!: string;

  ngOnInit(): void {
    if (this.category === 'Entertainment') {
      this.bgColor = 'bg-g';
    } else if (this.category === 'Bills') {
      this.bgColor = 'bg-cyan';
    } else if (this.category === 'Dining Out') {
      this.bgColor = 'bg-yellow';
    } else if (this.category === 'Personal Care') {
      this.bgColor = 'bg-navy';
    }
  }
}
