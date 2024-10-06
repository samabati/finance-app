import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-money',
  standalone: true,
  imports: [],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.css',
})
export class AddMoneyComponent {
  @Input() id!: number;
  router = inject(Router);

  navigateToAdd() {
    this.router.navigateByUrl(`/pots/${this.id}/add`);
  }
}
