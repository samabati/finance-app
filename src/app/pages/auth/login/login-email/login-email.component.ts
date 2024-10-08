import { Component, forwardRef, Input, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-login-email',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginEmailComponent),
      multi: true,
    },
  ],
  templateUrl: './login-email.component.html',
  styleUrl: './login-email.component.css',
})
export class LoginEmailComponent implements ControlValueAccessor {
  email!: string;
  @Input() error!: string;

  onChange = (value: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.email = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: any) {
    let inputValue = event.target.value;
    this.email = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }
}
