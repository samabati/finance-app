import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PotsService } from '../../services/pots/pots.service';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../add-new-budgets/add-button/add-button.component';
import { PotNameComponent } from '../add-new-pots/pot-name/pot-name.component';
import { AddSpendComponent } from '../add-new-budgets/add-spend/add-spend.component';
import { AddThemeComponent } from '../add-new-budgets/add-theme/add-theme.component';
import { Pot } from '../../types/pot';
import { Subscription, take } from 'rxjs';
import { Theme, THEMES } from '../../types/theme';

@Component({
  selector: 'app-edit-pots',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddButtonComponent,
    PotNameComponent,
    AddSpendComponent,
    AddThemeComponent,
  ],
  templateUrl: './edit-pots.component.html',
  styleUrl: './edit-pots.component.css',
})
export class EditPotsComponent implements OnDestroy {
  router = inject(Router);
  editPotForm!: FormGroup;
  potService = inject(PotsService);
  fb = inject(FormBuilder);
  pot: Pot = {
    id: 0,
    name: '',
    saved: 0,
    target: 0,
    theme: {
      color: '',
      class: '',
      name: '',
    },
  };
  id!: number;
  activatedRoute = inject(ActivatedRoute);
  usedThemes!: Theme[];
  subscription = new Subscription();
  error = '';

  constructor() {
    this.loadIndex();
    this.buildForm();
    this.loadPot();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadIndex() {
    this.subscription.add(
      this.activatedRoute.paramMap.pipe(take(1)).subscribe((value) => {
        this.id = Number(value.get('index'));
      })
    );
  }

  loadPot() {
    this.subscription.add(
      this.potService.pots$.pipe(take(2)).subscribe((pots) => {
        let pot = pots.find((pot) => pot.id === this.id);
        if (pot) {
          this.pot = pot;
          this.updateForm();
        }
        this.usedThemes = pots.map((pot) => pot.theme);
      })
    );
  }

  buildForm() {
    this.editPotForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      saved: [''],
      target: ['', [Validators.required, Validators.min(1)]],
      theme: ['', Validators.required],
    });
  }

  updateForm() {
    this.editPotForm.patchValue({
      name: this.pot.name,
      saved: this.pot.saved,
      target: this.pot.target,
      theme: this.pot.theme,
    });

    this.subscription.add(
      this.editPotForm.valueChanges.subscribe((value) => {
        console.log('Form value changed: ', value);
      })
    );
  }

  submitForm() {
    if (this.editPotForm.valid) {
      console.log('Pot being added:', this.editPotForm.value);
      this.potService.editPot(this.editPotForm.value, this.id);
      this.exitPage();
    } else {
      let errors = [];
      if (this.editPotForm.get('target')?.errors) errors.push('Target');
      if (this.editPotForm.get('name')?.errors) errors.push('Name');
      if (errors.length > 1) {
        this.error = 'Target and Name are required';
      } else {
        this.error = `${errors[0]} is required`;
      }
    }
  }

  exitPage() {
    this.router.navigateByUrl('/pots');
  }
}
