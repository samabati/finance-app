import { Component, inject, Input } from '@angular/core';
import { BudgetsService } from '../../../services/budgets/budgets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
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

  ngOnInit(): void {
    if (this.router.url.includes('pots')) this.type = 'pots';
    if (this.router.url.includes('budgets')) this.type = 'budgets';
    this.activatedRoute.params.pipe(take(1)).subscribe((value) => {
      this.index = Number(value['index']);
      this.loadTitle();
    });
  }

  loadTitle() {
    if (this.type === 'budgets') {
      this.title = this.budgetService.getBudget(this.index).category;
    } else if (this.type === 'pots') {
      this.title = this.potService.getPot(this.index).name;
    }
  }

  exitPage() {
    this.router.navigateByUrl(`/${this.type}`);
  }
}
