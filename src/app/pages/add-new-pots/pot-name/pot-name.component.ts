import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

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
export class PotNameComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  name: string = '';
  charsLeft!: number;
  nameSubject = new BehaviorSubject(this.name);
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.nameSubject.subscribe((value) => {
      this.charsLeft = 30 - value.length;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.name = value;
    this.nameSubject.next(value);
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
    this.nameSubject.next(value);
    this.onChange(value);
    this.onTouched();
  }
}
