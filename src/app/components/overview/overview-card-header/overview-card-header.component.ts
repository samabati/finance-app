import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  router = inject(Router);

  navigateToPage() {
    this.router.navigateByUrl(
      `/${this.title.toLowerCase().split(' ').join('-')}`
    );
  }
}
