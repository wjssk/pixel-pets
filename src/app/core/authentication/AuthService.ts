import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user-related';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string,
    rememberMe: boolean,
  ): Observable<User> {
    return this.http.post<User>('/api/login', {
      username,
      password,
      rememberMe,
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Observable<User> {
    return this.http.post<User>('/api/register', {
      username,
      email,
      password,
      confirmPassword,
    });
  }

  logout(): Observable<any> {
    return this.http.get('/api/logout', {});
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get('/api/check-auth');
  }
}
