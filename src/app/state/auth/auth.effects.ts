// In auth.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { register, registerSuccess, registerFailure } from './auth.actions';
import { AuthService } from '../../core/authentication/AuthService';
import { of } from 'rxjs';

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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
