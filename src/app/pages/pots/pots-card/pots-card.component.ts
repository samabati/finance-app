import { Component, Input, OnInit } from '@angular/core';
import { AddMoneyComponent } from './add-money/add-money.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { Pot } from '../../../types/pot';
import { CommonModule } from '@angular/common';
import { EllipsesComponent } from '../../../components/shared/ellipses/ellipses.component';

@Component({
  selector: 'app-pots-card',
  standalone: true,
  imports: [
    AddMoneyComponent,
    WithdrawComponent,
    CommonModule,
    EllipsesComponent,
  ],
  templateUrl: './pots-card.component.html',
  styleUrl: './pots-card.component.css',
})
export class PotsCardComponent implements OnInit {
  @Input() pot!: Pot;
  @Input() index!: number;
  savedPercentage!: string;

  ngOnInit(): void {
    this.savedPercentage = ((this.pot.saved / this.pot.target) * 100).toFixed(
      1
    );
  }
}
