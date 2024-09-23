import { Component, Input, OnInit } from '@angular/core';
import { BudgetsCardItemComponent } from './budgets-card-item/budgets-card-item.component';
import { CommonModule } from '@angular/common';
import { BudgetsEllipsesComponent } from './budgets-ellipses/budgets-ellipses.component';
import { Budget } from '../../../types/budget';

@Component({
  selector: 'app-budgets-card',
  standalone: true,
  imports: [BudgetsCardItemComponent, CommonModule, BudgetsEllipsesComponent],
  templateUrl: './budgets-card.component.html',
  styleUrl: './budgets-card.component.css',
})
export class BudgetsCardComponent {
  @Input() budget!: Budget;
  @Input() index!: number;
}
