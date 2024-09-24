import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PotNameComponent } from './pot-name/pot-name.component';
import { AddThemeComponent } from '../add-new-budgets/add-theme/add-theme.component';
import { AddSpendComponent } from '../add-new-budgets/add-spend/add-spend.component';
import { AddButtonComponent } from '../add-new-budgets/add-button/add-button.component';
import { PotsService } from '../../services/pots/pots.service';

@Component({
  selector: 'app-add-new-pots',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PotNameComponent,
    AddThemeComponent,
    AddSpendComponent,
    AddButtonComponent,
  ],
  templateUrl: './add-new-pots.component.html',
  styleUrl: './add-new-pots.component.css',
})
export class AddNewPotsComponent {
  router = inject(Router);
  addPotForm!: FormGroup;
  budgetService = inject(PotsService);
  fb = inject(FormBuilder);

  constructor() {
    this.addPotForm = this.fb.group({
      name: ['', Validators.required],
      saved: [0],
      target: ['', [Validators.required, Validators.min(1)]],
      theme: [{ name: 'Green', class: 'bg-g' }, Validators.required],
    });

    this.addPotForm.valueChanges.subscribe((value) => {
      console.log('Form value changed: ', value);
    });
  }

  submitForm() {
    if (this.addPotForm.valid) {
      console.log('Pot being added:', this.addPotForm.value);
      this.budgetService.addPot(this.addPotForm.value);
      this.exitPage();
    } else {
      console.log('Form is invalid');
    }
  }

  exitPage() {
    this.router.navigateByUrl('/pots');
  }
}
