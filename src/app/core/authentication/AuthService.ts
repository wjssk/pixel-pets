import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user-related';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string,
    rememberMe: boolean,
  ): Observable<User> {
    return this.http
      .post<any>('/api/login', {
        username,
        password,
        rememberMe,
      })
      .pipe(map((response) => response.user));
  }

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Observable<User> {
    return this.http
      .post<any>('/api/register', {
        username,
        email,
        password,
        confirmPassword,
      })
      .pipe(map((response) => response.user));
  }

  logout(): Observable<any> {
    return this.http.get('/api/logout', {});
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get('/api/check-auth');
  }
}
