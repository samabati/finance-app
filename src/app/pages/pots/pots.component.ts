import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AddPotComponent } from './add-pot/add-pot.component';
import { PotsCardComponent } from './pots-card/pots-card.component';
import { RouterOutlet } from '@angular/router';
import { PotsService } from '../../services/pots/pots.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [
    AddPotComponent,
    PotsCardComponent,
    RouterOutlet,
    CommonModule,
    SkeletonModule,
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css',
})
export class PotsComponent implements OnInit, OnDestroy {
  potsService = inject(PotsService);
  subscription!: Subscription;
  loading = true;

  ngOnInit(): void {
    this.subscription = this.potsService.loading$.subscribe(
      (value) => (this.loading = value)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
