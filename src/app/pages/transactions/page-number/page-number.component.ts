import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-number.component.html',
  styleUrl: './page-number.component.css',
})
export class PageNumberComponent {
  @Input() number!: string;
  @Input() selected!: boolean;
}
