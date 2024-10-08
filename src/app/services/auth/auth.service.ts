import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
interface authState {
  authenticated: boolean;
  token: string;
  demo: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState: BehaviorSubject<authState> =
    new BehaviorSubject<authState>({
      authenticated: false,
      token: '',
      demo: false,
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
          let demo = false;
          if (res.id === 1) {
            demo = true;
          }
          this.authState.next({ authenticated: true, token, demo });
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

  authenticateUser(token: string, demo: boolean = false) {
    localStorage.setItem('token', token);
    this.authState.next({ authenticated: true, token, demo });
  }

  signUpUser(name: string, email: string, password: string) {
    return this.http.post<any>(this.baseUrl + 'signup', {
      name,
      email,
      password,
    });
  }

  getDemo(): boolean {
    return this.authState.getValue().demo;
  }

  demoLogin() {
    this.authenticateUser(
      'eyJhbGciOiJIUzI1NiJ9.MQ.SOe1LgGnUiHHaf5bFaE_BNCePG45InyS_0UbS8lb25M',
      true
    );
  }
}
