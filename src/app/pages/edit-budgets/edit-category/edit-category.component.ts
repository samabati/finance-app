import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditCategoryComponent),
      multi: true,
    },
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements ControlValueAccessor {
  onChange = (value: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.selected = value || this.selected;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  showDropdown: boolean = false;
  @Input() selected!: string;

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
    this.onChange(category);
    this.onTouched();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
