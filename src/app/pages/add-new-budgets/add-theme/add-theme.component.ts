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
  selected: string = 'Green';

  data = ['Green', 'Yellow', 'Cyan', 'Navy', 'Red', 'Purple', 'Turquoise'];

  selectCategory(color: string) {
    this.selected = color;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  bgColor() {}
}
