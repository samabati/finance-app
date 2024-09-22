import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent {
  showDropdown: boolean = false;
  selected: any = { name: 'Green', class: 'bg-g' };

  data = [
    { name: 'Green', class: 'bg-g' },
    { name: 'Yellow', class: 'bg-yellow' },
    { name: 'Cyan', class: 'bg-cyan' },
    { name: 'Navy', class: 'bg-navy' },
    { name: 'Red', class: 'bg-red' },
    { name: 'Purple', class: 'bg-purple' },
    { name: 'Turquoise', class: 'bg-turq' },
  ];

  selectCategory(category: any) {
    this.selected = category;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  bgColor() {}
}
