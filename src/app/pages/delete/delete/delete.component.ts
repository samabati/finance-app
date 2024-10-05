import { Component, inject, Input } from '@angular/core';
import { BudgetsService } from '../../../services/budgets/budgets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { PotsService } from '../../../services/pots/pots.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, ConfirmDeleteComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {
  type!: string;
  router = inject(Router);
  budgetService = inject(BudgetsService);
  potService = inject(PotsService);
  index!: number;
  title!: string;
  activatedRoute = inject(ActivatedRoute);
  subscription = new Subscription();

  ngOnInit(): void {
    this.loadType();
  }

  loadType() {
    if (this.router.url.includes('pots')) this.type = 'pots';
    if (this.router.url.includes('budgets')) this.type = 'budgets';
    this.loadId();
  }

  loadId() {
    this.subscription.add(
      this.activatedRoute.params.pipe(take(1)).subscribe((value) => {
        this.index = Number(value['index']);
        this.loadTitle();
      })
    );
  }

  loadTitle() {
    if (this.type === 'budgets') {
      this.subscription.add(
        this.budgetService.budgets$.pipe(take(2)).subscribe((budgets) => {
          let title = budgets.find((item) => item.id === this.index)?.category;
          if (title) this.title = title;
        })
      );
    } else if (this.type === 'pots') {
      this.subscription.add(
        this.potService.pots$.pipe(take(2)).subscribe((budgets) => {
          let title = budgets.find((item) => item.id === this.index)?.name;
          if (title) this.title = title;
        })
      );
    }
  }

  exitPage() {
    this.router.navigateByUrl(`/${this.type}`);
  }
}
