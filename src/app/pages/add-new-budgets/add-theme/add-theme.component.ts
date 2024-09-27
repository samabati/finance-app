import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { THEMES } from '../../../types/theme';

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

  writeValue(value: any): void {
    this.selected = value || { name: 'Green', class: 'bg-g', color: '#277C78' };
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  showDropdown: boolean = false;
  selected: any = { name: 'Green', class: 'bg-g', color: '#277C78' };

  data = THEMES;

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
