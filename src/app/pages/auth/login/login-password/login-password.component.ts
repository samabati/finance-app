import { Component, forwardRef, Input, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-login-password',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginPasswordComponent),
      multi: true,
    },
  ],
  templateUrl: './login-password.component.html',
  styleUrl: './login-password.component.css',
})
export class LoginPasswordComponent implements ControlValueAccessor {
  @Input() type!: string;
  password!: string;
  showPassword = false;
  @Input() error!: string;

  onChange = (value: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.password = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: any) {
    let inputValue = event.target.value;
    this.password = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
