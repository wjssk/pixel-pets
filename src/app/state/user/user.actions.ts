import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user-related';

export const updateHasPet = createAction(
  '[User] Update Has Pet',
  props<{ id: string }>(),
);

export const updateHasPetSuccess = createAction(
  '[User] Update Has Pet Success',
  props<{ user: User }>(),
);

export const updateHasPetFailure = createAction(
  '[User] Update Has Pet Failure',
  props<{ error: string }>(),
);
