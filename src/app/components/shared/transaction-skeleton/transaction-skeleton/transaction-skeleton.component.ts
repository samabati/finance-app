import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-transaction-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './transaction-skeleton.component.html',
  styleUrl: './transaction-skeleton.component.css',
})
export class TransactionSkeletonComponent {}
