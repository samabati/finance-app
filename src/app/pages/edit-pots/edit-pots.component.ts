import { Component, inject } from '@angular/core';
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
import { take } from 'rxjs';

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
export class EditPotsComponent {
  router = inject(Router);
  editPotForm!: FormGroup;
  potService = inject(PotsService);
  fb = inject(FormBuilder);
  pot!: Pot;
  index!: number;
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.loadIndex();

    this.loadPot();

    this.editPotForm = this.fb.group({
      name: [this.pot.name, Validators.required],
      saved: [this.pot.saved],
      target: [this.pot.target, [Validators.required, Validators.min(1)]],
      theme: [this.pot.theme, Validators.required],
    });

    this.editPotForm.valueChanges.subscribe((value) => {
      console.log('Form value changed: ', value);
    });
  }

  loadIndex() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((value) => {
      this.index = Number(value.get('index'));
    });
  }

  loadPot() {
    this.pot = this.potService.getPot(this.index);
  }

  submitForm() {
    if (this.editPotForm.valid) {
      console.log('Pot being added:', this.editPotForm.value);
      this.potService.editPot(this.editPotForm.value, this.index);
      this.exitPage();
    } else {
      console.log('Form is invalid');
    }
  }

  exitPage() {
    this.router.navigateByUrl('/pots');
  }
}
