import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-item.component.html',
  styleUrl: './summary-item.component.css',
})
export class SummaryItemComponent implements OnInit {
  @Input() category!: string;
  @Input() amount!: number;
  @Input() maxAmount!: number;
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
