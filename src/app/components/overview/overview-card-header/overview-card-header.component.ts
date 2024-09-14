import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-card-header',
  standalone: true,
  imports: [],
  templateUrl: './overview-card-header.component.html',
  styleUrl: './overview-card-header.component.css',
})
export class OverviewCardHeaderComponent {
  @Input() title!: string;
  @Input() navTitle!: string;
}
