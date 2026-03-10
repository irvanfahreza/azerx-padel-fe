import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, JwtResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  
  currentUser = signal<JwtResponse | null>(this.getUserFromStorage());

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUser.set(response);
      })
    );
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN';
  }

  private getUserFromStorage(): JwtResponse | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try { return JSON.parse(userStr); } catch (e) { return null; }
    }
    return null;
  }
}
