import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  showDropdown: boolean = false;
  selected: string = 'Entertainment';

  data = [
    'Entertainment',
    'Bills',
    'Groceries',
    'Dining Out',
    'Transportation',
    'Personal Care',
    'Education',
  ];

  selectCategory(category: string) {
    this.selected = category;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
