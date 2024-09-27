import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Budget } from '../../../../types/budget';

@Component({
  selector: 'app-summary-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-item.component.html',
  styleUrl: './summary-item.component.css',
})
export class SummaryItemComponent {
  @Input() budget!: Budget;
}
