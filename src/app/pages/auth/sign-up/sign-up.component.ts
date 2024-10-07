import { Component, inject } from '@angular/core';
import { LoginEmailComponent } from '../login/login-email/login-email.component';
import { LoginPasswordComponent } from '../login/login-password/login-password.component';
import { AddButtonComponent } from '../../add-new-budgets/add-button/add-button.component';
import { Router } from '@angular/router';
import { SignUpNameComponent } from './sign-up-name/sign-up-name.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    LoginEmailComponent,
    LoginPasswordComponent,
    AddButtonComponent,
    SignUpNameComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  signUpForm!: FormGroup;
  serverError = '';
  nameError = '';
  emailError = '';
  passwordError = '';

  constructor() {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(64)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  submitForm() {
    if (this.signUpForm.valid) {
      this.resetErrors();
      this.signUpUser();
    } else {
      this.showErrors();
    }
  }

  signUpUser() {
    console.log('Signing up user:', this.signUpForm.getRawValue());
    this.authService
      .signUpUser(
        this.signUpForm.get('name')!.value,
        this.signUpForm.get('email')!.value,
        this.signUpForm.get('password')!.value
      )
      .subscribe({
        next: (res) => {
          console.log('User logged in successfully:', res);
          this.authService.authenticateUser(res.token);
          this.navigateToHome();
        },
        error: (err) => {
          console.log('Error logging user in:', err);
          this.serverError = err.error.errors.message || err.error.message;
        },
      });
  }

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  resetErrors() {
    this.nameError = '';
    this.serverError = '';
    this.emailError = '';
    this.passwordError = '';
  }

  showErrors() {
    this.resetErrors();
    if (this.signUpForm.get('name')?.errors)
      this.nameError = 'Name is required';
    if (this.signUpForm.get('email')?.errors)
      this.emailError = 'Must be a valid email';
    if (this.signUpForm.get('password')?.errors)
      this.passwordError = '8 character minimum required';
  }
}
