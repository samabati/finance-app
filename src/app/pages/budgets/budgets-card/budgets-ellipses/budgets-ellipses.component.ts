import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgets-ellipses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budgets-ellipses.component.html',
  styleUrl: './budgets-ellipses.component.css',
})
export class BudgetsEllipsesComponent {
  @Input() index!: number;
  showDropdown = false;
  router = inject(Router);

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  editBudget() {
    this.router.navigateByUrl(`/budgets/edit/${this.index}`);
  }

  deleteBudget() {
    this.router.navigateByUrl(`/budgets/delete/${this.index}`);
  }
}
