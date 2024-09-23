import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-edit-theme',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditThemeComponent),
      multi: true,
    },
  ],
  templateUrl: './edit-theme.component.html',
  styleUrl: './edit-theme.component.css',
})
export class EditThemeComponent implements ControlValueAccessor {
  onChange = (value: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.selected = this.selected;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  showDropdown: boolean = false;
  @Input() selected: any;

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
