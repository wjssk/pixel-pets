import { User } from '../../shared/models/user-related';

export interface AuthState {
  user: User | null;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};
