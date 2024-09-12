import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { MinimizeComponent } from './minimize/minimize.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavButtonComponent, MinimizeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
