import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddThemeComponent),
      multi: true,
    },
  ],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent implements ControlValueAccessor {
  onChange = (value: any) => {};

  onTouched = () => {};

  writeValue(obj: any): void {
    this.selected = { name: 'Green', class: 'bg-g' };
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

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
    this.onChange(category);
    this.onTouched();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  bgColor() {}
}
