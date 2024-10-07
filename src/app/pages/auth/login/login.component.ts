import { Component, inject } from '@angular/core';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { AddButtonComponent } from '../../add-new-budgets/add-button/add-button.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginEmailComponent,
    LoginPasswordComponent,
    AddButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  serverError = '';
  emailError = '';
  passwordError = '';

  constructor() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.loginForm.valueChanges.subscribe((value) => {
      console.log('Form value changes:', value);
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.resetErrors();
      this.loginUser();
    } else {
      this.showErrors();
    }
  }

  loginUser() {
    console.log('Login form value:', this.loginForm.getRawValue());
    this.authService
      .loginUser(
        this.loginForm.get('email')!.value,
        this.loginForm.get('password')!.value
      )
      .subscribe({
        next: (res) => {
          console.log('User logged in successfully:', res);
          this.authService.authenticateUser(res.token);
        },
        error: (err) => {
          console.log('Error logging user in:', err);
          this.serverError = err.error.errors.message;
        },
      });
  }

  navigateToSignup() {
    this.router.navigateByUrl('/auth/signup');
  }

  resetErrors() {
    this.serverError = '';
    this.emailError = '';
    this.passwordError = '';
  }

  showErrors() {
    this.resetErrors();
    if (this.loginForm.get('email')?.errors)
      this.emailError = 'Must be a valid email';
    if (this.loginForm.get('password')?.errors)
      this.passwordError = '8 character minimum required';
  }

  demoLogin() {
    this.authService.demoLogin();
  }
}
