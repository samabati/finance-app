import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-edit-spend',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditSpendComponent),
      multi: true,
    },
  ],
  imports: [],
  templateUrl: './edit-spend.component.html',
  styleUrl: './edit-spend.component.css',
})
export class EditSpendComponent implements ControlValueAccessor {
  @Input() value!: number;

  onChanges = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    this.value = value || this.value;
  }
  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: any) {
    let num = Number(event.target.value);
    this.value = num;
    this.onChanges(num);
    this.onTouched();
  }
}
