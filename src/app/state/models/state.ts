import { User } from '../../shared/models/user-related';

export const initialState: AppState = {
  auth: {
    user: null,
    errors: {},
  },
};
export interface AppState {
  auth: AuthState;
  // add any other slices of state here
}

export interface AuthState {
  user: User | null;
  errors: AuthErrors;
  // add any other properties here
}

export interface AuthErrors {
  username?: string;
  email?: string;
  password?: string;
  login?: string;
}
