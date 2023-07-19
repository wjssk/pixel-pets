import { createReducer, on } from '@ngrx/store';
import {
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
} from './auth.actions';
import { initialState } from '../models/state';

export const authReducer = createReducer(
  initialState,
  on(register, (state) => ({ ...state, error: null })),
  on(registerSuccess, (state, { user }) => ({ ...state, user })),
  on(registerFailure, (state, { error }) => ({ ...state, errors: error })),
  on(login, (state) => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(loginFailure, (state, { error }) => ({ ...state, errors: error })),
  on(logout, (state) => ({ ...state, user: null })),
  on(logoutSuccess, (state) => ({ ...state, user: null })),
);
