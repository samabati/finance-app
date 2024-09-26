import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NavbarService } from './services/navbar.service';
import { filter } from 'rxjs';
import NavItems from './types/navItems';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'finance-app';
  router = inject(Router);
  navService = inject(NavbarService);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((value) => this.updateNav(value.url));
  }

  updateNav(url: string) {
    if (url.includes('transactions'))
      this.navService.setNavStatus(NavItems.TRANSACTIONS);
    else if (url.includes('budgets'))
      this.navService.setNavStatus(NavItems.BUDGETS);
    else if (url.includes('pots')) this.navService.setNavStatus(NavItems.POTS);
    else if (url.includes('recurring'))
      this.navService.setNavStatus(NavItems.RECURRING);
    else this.navService.setNavStatus(NavItems.OVERVIEW);
  }
}
