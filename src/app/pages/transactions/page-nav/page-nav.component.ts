import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-nav',
  standalone: true,
  imports: [],
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.css',
})
export class PageNavComponent {
  @Input() type!: string;
}
