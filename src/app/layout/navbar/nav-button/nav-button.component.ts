import { Component, inject, Input, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { CommonModule } from '@angular/common';
import NavItems from '../../../types/navItems';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css',
})
export class NavButtonComponent implements OnInit {
  @Input() name!: NavItems;
  @Input() icon!: string;
  router = inject(Router);
  navService = inject(NavbarService);

  buttonClicked() {
    let route = this.name.toLowerCase().split(' ').join('-');
    if (route === 'overview') route = '';
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {}
}
