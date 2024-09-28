import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pots-savings-micro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pots-savings-micro.component.html',
  styleUrl: './pots-savings-micro.component.css',
})
export class PotsSavingsMicroComponent {
  @Input() title!: string;
  @Input() amount!: number;
  @Input() theme!: any;
}
