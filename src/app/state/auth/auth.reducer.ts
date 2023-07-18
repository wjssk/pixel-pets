import { createReducer, on } from '@ngrx/store';
import {
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
} from './auth.actions';
import { initialState } from '../models/state';

export const authReducer = createReducer(
  initialState,
  on(register, (state) => ({ ...state, error: null })),
  on(registerSuccess, (state, { user }) => ({ ...state, user })),
  on(registerFailure, (state, { error }) => ({ ...state, error })),
  on(login, (state) => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
);