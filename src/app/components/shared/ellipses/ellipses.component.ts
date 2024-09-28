import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ellipses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ellipses.component.html',
  styleUrl: './ellipses.component.css',
})
export class EllipsesComponent {
  @Input() type!: string;
  @Input() index!: number;
  showDropdown = false;
  router = inject(Router);

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  editBudget() {
    this.toggleDropdown();
    this.router.navigateByUrl(
      `/${this.type.toLowerCase()}s/edit/${this.index}`
    );
  }

  deleteBudget() {
    this.toggleDropdown();
    this.router.navigateByUrl(
      `/${this.type.toLowerCase()}s/delete/${this.index}`
    );
  }
}
