import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-add-spend',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddSpendComponent),
      multi: true,
    },
  ],
  templateUrl: './add-spend.component.html',
  styleUrl: './add-spend.component.css',
})
export class AddSpendComponent implements ControlValueAccessor {
  @Input() title!: string;

  value!: number;

  onChanges = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    this.value = value;
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
