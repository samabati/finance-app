import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recurring-item',
  standalone: true,
  imports: [],
  templateUrl: './recurring-item.component.html',
  styleUrl: './recurring-item.component.css',
})
export class RecurringItemComponent {
  @Input() title!: string;
  @Input() amount!: string;
}
