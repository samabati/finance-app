import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { Theme, THEMES } from '../../types/theme';
import { Subscription } from 'rxjs';

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
export class AddNewPotsComponent implements OnDestroy {
  router = inject(Router);
  addPotForm!: FormGroup;
  potsService = inject(PotsService);
  fb = inject(FormBuilder);
  usedThemes!: Theme[];
  themes = THEMES;
  subscription!: Subscription;

  constructor() {
    this.subscription = this.potsService.getThemes().subscribe((value) => {
      this.usedThemes = value;
    });

    this.addPotForm = this.fb.group({
      name: ['', Validators.required],
      saved: [0],
      target: ['', [Validators.required, Validators.min(1)]],
      theme: [
        this.themes.find((theme) => !this.isUsedTheme(theme)),
        Validators.required,
      ],
    });

    this.addPotForm.valueChanges.subscribe((value) => {
      console.log('Form value changed: ', value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm() {
    if (this.addPotForm.valid) {
      console.log('Pot being added:', this.addPotForm.value);
      this.potsService.addPot(this.addPotForm.value);
      this.exitPage();
    } else {
      console.log('Form is invalid');
    }
  }

  exitPage() {
    this.router.navigateByUrl('/pots');
  }

  isUsedTheme(theme: Theme): boolean {
    return this.usedThemes.some(
      (used) => used.name === theme.name && used.class === theme.class
    );
  }
}
