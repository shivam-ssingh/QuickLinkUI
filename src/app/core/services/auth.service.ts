import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from './api.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user';

  isAuthenticated = signal<boolean>(this.hasToken());
  currentUser = signal<{ email: string; username: string } | null>(
    this.getStoredUser(),
  );

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  register(request: RegisterRequest) {
    return this.api
      .post<AuthResponse>('/api/auth/register', request)
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  login(request: LoginRequest) {
    return this.api
      .post<AuthResponse>('/api/auth/login', request)
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private handleAuthResponse(response: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify({
        email: response.email,
        username: response.username,
      }),
    );
    this.isAuthenticated.set(true);
    this.currentUser.set({
      email: response.email,
      username: response.username,
    });
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
