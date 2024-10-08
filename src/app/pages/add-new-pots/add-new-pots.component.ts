import { Component, inject, OnDestroy } from '@angular/core';
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
import { Subscription, take } from 'rxjs';

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
  usedThemes: Theme[] = [];
  themes = THEMES;
  subscription = new Subscription();
  error!: string;

  constructor() {
    this.loadForm();
    this.loadThemes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadThemes() {
    this.subscription.add(
      this.potsService.pots$.pipe(take(2)).subscribe((pots) => {
        let usedThemes = pots.map((pots) => pots.theme);
        if (usedThemes.length > 0) {
          this.usedThemes = usedThemes;
          this.updateForm();
        }
      })
    );
  }

  loadForm() {
    this.addPotForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      saved: [0],
      target: ['', [Validators.required, Validators.min(1)]],
      theme: [
        this.themes.find((theme) => !this.isUsedTheme(theme)),
        Validators.required,
      ],
    });
  }

  updateForm() {
    this.addPotForm.patchValue({
      theme: this.themes.find((theme) => !this.isUsedTheme(theme)),
    });
  }

  submitForm() {
    if (this.addPotForm.valid) {
      console.log('Pot being added:', this.addPotForm.value);
      this.potsService.addPot(this.addPotForm.value);
      this.exitPage();
    } else {
      this.setError();
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

  setError() {
    let errorArr = [];
    if (this.addPotForm.get('name')?.errors) errorArr.push('Name');
    if (this.addPotForm.get('target')?.errors) errorArr.push('Target');
    if (errorArr.length > 1) {
      this.error = `Name and Target are required`;
    } else {
      this.error = `${errorArr[0]} is required`;
    }
  }
}
