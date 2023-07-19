import { createSelector } from '@ngrx/store';
import { AppState, AuthState } from '../models/state';

export const selectAuthState = (state: AppState) => state.auth;

export const selectAuthErrors = createSelector(
  selectAuthState,
  (state: AuthState) => state.errors,
);
