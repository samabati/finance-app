import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-pot-name',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PotNameComponent),
      multi: true,
    },
  ],
  templateUrl: './pot-name.component.html',
  styleUrl: './pot-name.component.css',
})
export class PotNameComponent implements ControlValueAccessor {
  name!: string;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.name = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(name: any) {
    let value = name.target.value;
    this.name = value;
    this.onChange(value);
    this.onTouched();
  }
}
