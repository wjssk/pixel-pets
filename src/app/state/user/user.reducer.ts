import { createReducer, on } from '@ngrx/store';
import { initialState } from '../models/state';
import {
  updateHasPet,
  updateHasPetFailure,
  updateHasPetSuccess,
} from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(updateHasPet, (state) => ({ ...state, error: null })),
  on(updateHasPetSuccess, (state, { user }) => ({ ...state, user })),
  on(updateHasPetFailure, (state, { error }) => ({ ...state, error })),
);
