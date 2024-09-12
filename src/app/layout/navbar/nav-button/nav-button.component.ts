import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css',
})
export class NavButtonComponent {
  @Input() name!: string;
  @Input() icon!: string;
}
