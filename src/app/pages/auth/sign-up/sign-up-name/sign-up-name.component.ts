import { Component, forwardRef, Input, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-sign-up-name',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignUpNameComponent),
      multi: true,
    },
  ],
  templateUrl: './sign-up-name.component.html',
  styleUrl: './sign-up-name.component.css',
})
export class SignUpNameComponent implements ControlValueAccessor {
  @Input() error!: string;
  name!: string;

  onChange = (value: any) => {};

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

  onInput(event: any) {
    let inputValue = event.target.value;
    this.name = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }
}
