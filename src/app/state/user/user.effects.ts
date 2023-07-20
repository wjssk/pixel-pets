import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  updateHasPet,
  updateHasPetFailure,
  updateHasPetSuccess,
} from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../core/user/user-service.service';

@Injectable()
export class UserEffects {
  updateHasPet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHasPet),
      mergeMap((action) =>
        this.userService.updateHasPet(action.id, true).pipe(
          map((user) => updateHasPetSuccess({ user })),
          catchError((error) => of(updateHasPetFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
