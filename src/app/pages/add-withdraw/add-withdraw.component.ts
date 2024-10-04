import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PotsService } from '../../services/pots/pots.service';
import { Pot } from '../../types/pot';
import { debounceTime, Subscription, take } from 'rxjs';
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
export class AddWithdrawComponent implements OnDestroy {
  type!: string;
  router = inject(Router);
  activatedRouter = inject(ActivatedRoute);
  addWithdrawForm!: FormGroup;
  potService = inject(PotsService);
  fb = inject(FormBuilder);
  pot: Pot = {
    id: 0,
    name: '',
    saved: 0,
    target: 0,
    theme: { class: '', name: '', color: '' },
  };
  index!: number;
  newAmount!: number;
  subscription = new Subscription();
  error = '';

  constructor() {
    this.loadType();
    this.loadIndex();
    this.loadPot();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm() {
    if (this.addWithdrawForm.valid) {
      console.log(`Amount being ${this.type}ed:`, this.addWithdrawForm.value);
      if (this.type === 'add') {
        this.potService.addFunds(this.pot.id, this.newAmount);
      } else if (this.type === 'withdraw') {
        this.potService.withdrawFunds(this.pot.id, this.newAmount);
      }
      this.exitPage();
    } else {
      let savedError = this.addWithdrawForm.get('saved')?.errors;
      if (savedError) {
        this.error = `Amount to ${this.type} is required`;
      }
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
    this.subscription.add(
      this.potService.pots$.pipe(take(2)).subscribe((pots) => {
        let pot = pots.find((pot) => pot.id === this.index);
        if (pot) {
          this.pot = pot;
          this.newAmount = pot.saved;
        }
      })
    );
  }

  buildForm() {
    this.addWithdrawForm = this.fb.group({
      saved: ['', [Validators.required, Validators.min(1)]],
    });

    this.subscription.add(
      this.addWithdrawForm.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value) => {
          if (this.type === 'add') {
            this.newAmount = this.pot.saved + value.saved;
          } else if (this.type === 'withdraw') {
            this.newAmount = this.pot.saved - value.saved;
          }
          console.log('Form value changed: ', value);
        })
    );
  }

  getNewPercentage() {
    return (this.addWithdrawForm.value.saved / this.pot.saved) * 100;
  }

  exitPage() {
    this.router.navigateByUrl('/pots');
  }
}
