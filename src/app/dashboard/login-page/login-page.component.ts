import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, State, Store } from '@ngrx/store';
import { login, logout } from '../../state/auth/auth.actions';
import { Observable, of } from 'rxjs';
import { AppState, AuthState } from '../../state/models/state';
import { selectAuthErrors } from '../../state/auth/auth.selectors';
import { map, tap } from 'rxjs/operators';

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

  loginError$: Observable<string | undefined> = of(undefined);

  formSubmitted = false;

  ngOnInit(): void {
    this.store.dispatch(logout());
  }

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}
  onLoginClick(): void {
    this.formSubmitted = true;
    const errors$ = this.store.pipe(select(selectAuthErrors));
    this.loginError$ = errors$.pipe(map((errors) => errors?.login));
    this.store.dispatch(login(this.loginForm));
  }

  onSignUpClick(): void {
    this.router.navigate(['/signup']);
  }
}
