import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, State, Store } from '@ngrx/store';
import { login } from '../../state/auth/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from '../../state/models/state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = {
    username: '',
    password: '',
    rememberMe: false,
  };

  constructor(
    private router: Router,
    private store: Store<AuthState>,
  ) {}
  onLoginClick(): void {
    this.store.dispatch(login(this.loginForm));
  }

  onSignUpClick(): void {
    this.router.navigate(['/signup']);
  }
}
