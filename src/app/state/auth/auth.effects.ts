import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ username: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ success: string }>(),
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>(),
);
