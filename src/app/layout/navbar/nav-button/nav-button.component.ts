import { Component, inject, Input } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { CommonModule } from '@angular/common';
import NavItems from '../../../types/navItems';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css',
})
export class NavButtonComponent {
  @Input() name!: NavItems;
  @Input() icon!: string;

  navService = inject(NavbarService);

  buttonClicked() {
    console.log('Button clicked ran');
    this.navService.setNavStatus(this.name);
  }
}
