import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
interface authState {
  authenticated: boolean;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState: BehaviorSubject<authState> =
    new BehaviorSubject<authState>({
      authenticated: false,
      token: '',
    });

  authState$ = this.authState.asObservable();

  baseUrl = `${environment.apiUrl}/api/v1/auth/`;

  constructor(private http: HttpClient) {}

  getAuthState() {
    return this.authState$.pipe(map((state) => state.authenticated));
  }

  checkStorage() {
    let token = localStorage.getItem('token');
    if (token) {
      let headers: HttpHeaders = new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`
      );
      this.http.get<any>(this.baseUrl + 'me', { headers }).subscribe({
        next: (res) => {
          console.log('Valid token, user logged in!');
          this.authState.next({ authenticated: true, token });
        },
        error: (err) => {
          console.log('Invalid token, unable to login user!', err);
        },
      });
    }
  }

  getToken() {
    return this.authState.pipe(map((state) => state.token));
  }

  loginUser(email: string, password: string) {
    return this.http.post<any>(this.baseUrl + 'login', { email, password });
  }

  authenticateUser(token: string) {
    localStorage.setItem('token', token);
    this.authState.next({ authenticated: true, token });
  }

  signUpUser(name: string, email: string, password: string) {
    return this.http.post<any>(this.baseUrl + 'signup', {
      name,
      email,
      password,
    });
  }

  demoLogin() {
    this.authenticateUser(
      'eyJhbGciOiJIUzI1NiJ9.MQ.SOe1LgGnUiHHaf5bFaE_BNCePG45InyS_0UbS8lb25M'
    );
  }
}
