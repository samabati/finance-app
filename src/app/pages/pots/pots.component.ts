import { Component, inject } from '@angular/core';
import { AddPotComponent } from './add-pot/add-pot.component';
import { PotsCardComponent } from './pots-card/pots-card.component';
import { RouterOutlet } from '@angular/router';
import { PotsService } from '../../services/pots/pots.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [AddPotComponent, PotsCardComponent, RouterOutlet, CommonModule],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css',
})
export class PotsComponent {
  potsService = inject(PotsService);
}
