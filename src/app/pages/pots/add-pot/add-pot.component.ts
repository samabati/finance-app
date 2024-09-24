import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pot',
  standalone: true,
  imports: [],
  templateUrl: './add-pot.component.html',
  styleUrl: './add-pot.component.css',
})
export class AddPotComponent {
  router = inject(Router);

  navigateToAdd() {
    console.log('Function ran');
    this.router.navigateByUrl('pots/add');
  }
}
