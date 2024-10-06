import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css',
})
export class WithdrawComponent {
  @Input() id!: number;
  router = inject(Router);

  navigateToWithdraw() {
    this.router.navigateByUrl(`/pots/${this.id}/withdraw`);
  }
}
