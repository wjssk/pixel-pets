import { Component } from '@angular/core';
import { register } from '../../state/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppState, AuthErrors, AuthState } from '../../state/models/state';
import { map, tap } from 'rxjs/operators';
import { selectAuthErrors } from '../../state/auth/auth.selectors';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signupForm = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  usernameError$: Observable<string | undefined> = of(undefined);
  emailError$: Observable<string | undefined> = of(undefined);
  passwordError$: Observable<string | undefined> = of(undefined);

  formSubmitted = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  onSignup() {
    this.formSubmitted = true;

    const errors$ = this.store.pipe(
      select(selectAuthErrors),
      tap((errors) => console.log('errors from selector:', errors)),
    );

    this.usernameError$ = errors$.pipe(
      map((errors) => errors?.username),
      tap((usernameError) => console.log('username error:', usernameError)),
    );

    this.emailError$ = errors$.pipe(
      map((errors) => errors?.email),
      tap((emailError) => console.log('email error:', emailError)),
    );

    this.passwordError$ = errors$.pipe(
      map((errors) => errors?.password),
      tap((passwordError) => console.log('password error:', passwordError)),
    );

    this.store.dispatch(
      register({
        username: this.signupForm.username,
        email: this.signupForm.email,
        password: this.signupForm.password,
        confirmPassword: this.signupForm.confirmPassword,
      }),
    );
  }
}
