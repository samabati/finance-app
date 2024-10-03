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
  subscription!: Subscription;

  constructor() {
    this.loadIndex();
    this.loadPot();

    this.subscription = this.potService.getThemes().subscribe((value) => {
      this.usedThemes = value;
    });

    this.editPotForm = this.fb.group({
      name: [this.pot.name, [Validators.required, Validators.maxLength(30)]],
      saved: [this.pot.saved],
      target: [this.pot.target, [Validators.required, Validators.min(1)]],
      theme: [this.pot.theme, Validators.required],
    });

    this.editPotForm.valueChanges.subscribe((value) => {
      console.log('Form value changed: ', value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadIndex() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((value) => {
      this.id = Number(value.get('index'));
    });
  }

  loadPot() {
    let loadedPot = this.potService.getPot(this.id);
    if (loadedPot) {
      this.pot = loadedPot;
    }
  }

  submitForm() {
    if (this.editPotForm.valid) {
      console.log('Pot being added:', this.editPotForm.value);
      this.potService.editPot(this.editPotForm.value, this.id);
      this.exitPage();
    } else {
      console.log('Form is invalid');
    }
  }

  exitPage() {
    this.router.navigateByUrl('/pots');
  }
}
