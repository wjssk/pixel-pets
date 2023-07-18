import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user-related';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // This is a dummy example. In a real app, you would check this data
  // from a secure source, not a local variable.
  isLoggedIn = false;
  rememberMeChecked = false;

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
  ): Observable<User> {
    return this.http.post<User>('/api/register', { username, email, password });
  }
}
