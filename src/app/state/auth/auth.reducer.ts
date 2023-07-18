import { createReducer, on } from '@ngrx/store';
import { register, registerSuccess, registerFailure } from './auth.actions';
import { initialState } from '../models/auth.state';

export const authReducer = createReducer(
  initialState,
  on(register, (state) => ({ ...state, error: null })),
  on(registerSuccess, (state, { user }) => ({ ...state, user })),
  on(registerFailure, (state, { error }) => ({ ...state, error })),
);
