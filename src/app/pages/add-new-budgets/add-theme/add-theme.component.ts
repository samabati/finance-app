import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Theme, THEMES } from '../../../types/theme';
import { Router } from '@angular/router';
import { BudgetsService } from '../../../services/budgets/budgets.service';
import { PotsService } from '../../../services/pots/pots.service';

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
export class AddThemeComponent implements ControlValueAccessor, OnInit {
  @Input() usedThemes!: Theme[];
  router = inject(Router);
  budgetService = inject(BudgetsService);
  potsService = inject(PotsService);

  ngOnInit(): void {}

  onChange = (value: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.selected = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  showDropdown: boolean = false;
  selected!: Theme;

  themes = THEMES;

  selectTheme(theme: any) {
    if (!this.isUsedTheme(theme)) {
      this.selected = theme;
      this.onChange(theme);
      this.onTouched();
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  isUsedTheme(theme: Theme): boolean {
    return this.usedThemes.some((used) => used.name == theme.name);
  }

  bgColor() {}
}
