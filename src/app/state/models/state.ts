import { User } from '../../shared/models/user-related';

export interface State {
  token: string | null;
  user: User | null;
}

export const initialState: State = {
  token: null,
  user: null,
};
