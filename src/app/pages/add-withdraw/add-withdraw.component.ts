import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PotsService } from '../../services/pots/pots.service';
import { Pot } from '../../types/pot';
import { debounceTime, take } from 'rxjs';
import { AddButtonComponent } from '../add-new-budgets/add-button/add-button.component';
import { AddSpendComponent } from '../add-new-budgets/add-spend/add-spend.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-withdraw',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddButtonComponent,
    AddSpendComponent,
    CommonModule,
  ],
  templateUrl: './add-withdraw.component.html',
  styleUrl: './add-withdraw.component.css',
})
export class AddWithdrawComponent {
  type!: string;
  router = inject(Router);
  activatedRouter = inject(ActivatedRoute);
  addWithdrawForm!: FormGroup;
  potService = inject(PotsService);
  fb = inject(FormBuilder);
  pot!: Pot;
  index!: number;
  newAmount!: number;

  constructor() {
    this.loadType();
    this.loadIndex();
    this.loadPot();
    this.addWithdrawForm = this.fb.group({
      saved: ['', [Validators.required, Validators.min(1)]],
    });

    this.addWithdrawForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (this.type === 'add') {
          this.newAmount = this.pot.saved + value.saved;
        } else if (this.type === 'withdraw') {
          this.newAmount = this.pot.saved - value.saved;
        }
        console.log('Form value changed: ', value);
      });
  }

  submitForm() {
    if (this.addWithdrawForm.valid) {
      console.log(`Amount being ${this.type}ed:`, this.addWithdrawForm.value);
      this.potService.editPot({ saved: this.newAmount }, this.index);
      this.exitPage();
    } else {
      console.log('Form is invalid');
    }
  }

  loadType() {
    if (this.router.url.includes('add')) this.type = 'add';
    else if (this.router.url.includes('withdraw')) this.type = 'withdraw';
  }

  loadIndex() {
    this.activatedRouter.params
      .pipe(take(1))
      .subscribe((value) => (this.index = Number(value['index'])));
  }

  loadPot() {
    let loadedPot = this.potService.getPot(this.index);
    if (loadedPot) {
      this.pot = loadedPot;
    }
    this.newAmount = this.pot.saved;
  }

  getNewPercentage() {
    return (this.addWithdrawForm.value.saved / this.pot.saved) * 100;
  }

  exitPage() {
    this.router.navigateByUrl('/pots');
  }
}
