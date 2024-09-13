import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { MinimizeComponent } from './minimize/minimize.component';
import NavItems from '../../types/navItems';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavButtonComponent, MinimizeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  NavItems = NavItems;
}
