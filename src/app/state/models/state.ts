import { User } from '../../shared/models/user-related';

export interface AppState {
  auth: AuthState;
  // add any other slices of state here
}

export interface AuthState {
  user: User | null;
  error: string;
  // add any other properties here
}
export const initialState: AppState = {
  auth: {
    user: null,
    error: '',
  },
};
