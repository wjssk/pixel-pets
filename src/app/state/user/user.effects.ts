import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  updateHasPet,
  updateHasPetFailure,
  updateHasPetSuccess,
} from './user.actions';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../core/user/user-service.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
