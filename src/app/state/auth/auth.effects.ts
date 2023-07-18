import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
} from './auth.actions';
import { AuthService } from '../../core/authentication/AuthService';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap((action) =>
        this.authService
          .register(action.username, action.email, action.password)
          .pipe(
            map((user) => registerSuccess({ user })),
            catchError((error) => of(registerFailure({ error }))),
          ),
      ),
    ),
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(({ user }) => {
          this.router.navigate(['/choose-pet']);
        }),
      ),
    { dispatch: false },
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService
          .login(action.username, action.password, action.rememberMe)
          .pipe(
            map((user) => loginSuccess({ user })),
            catchError((error) => of(loginFailure({ error }))),
          ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ user }) => {
          if (user.hasPet) {
            this.router.navigate(['/homepage']);
          } else {
            this.router.navigate(['/choose-pet']);
          }
        }),
      ),
    { dispatch: false },
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}