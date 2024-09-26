import { Component, Input } from '@angular/core';
import { BudgetsCardItemComponent } from './budgets-card-item/budgets-card-item.component';
import { CommonModule } from '@angular/common';
import { Budget } from '../../../types/budget';
import { EllipsesComponent } from '../../../components/shared/ellipses/ellipses.component';

@Component({
  selector: 'app-budgets-card',
  standalone: true,
  imports: [BudgetsCardItemComponent, CommonModule, EllipsesComponent],
  templateUrl: './budgets-card.component.html',
  styleUrl: './budgets-card.component.css',
})
export class BudgetsCardComponent {
  @Input() budget!: Budget;
  @Input() index!: number;
}
