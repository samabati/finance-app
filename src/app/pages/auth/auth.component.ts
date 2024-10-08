import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit, OnDestroy {
  router = inject(Router);
  subscription!: Subscription;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.subscription = this.authService
      .getAuthState()
      .subscribe((authenticated) => {
        if (authenticated) this.router.navigateByUrl('/');
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
