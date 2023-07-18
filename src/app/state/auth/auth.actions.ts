import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user-related';

export const register = createAction(
  '[Auth] Register User',
  props<{ username: string; email: string; password: string }>(),
);

export const registerSuccess = createAction(
  '[Auth] Register User Success',
  props<{ user: User }>(),
);

export const registerFailure = createAction(
  '[Auth] Register User Failure',
  props<{ error: any }>(),
);
