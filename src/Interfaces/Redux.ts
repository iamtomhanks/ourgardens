// Interfaces
import { HomeState } from 'Redux/Reducers/Home';
import { RequestsState } from 'Redux/Reducers/Requests';

export interface Action {
  type: string;
  payload: {[key: string]: unknown};
}

// Store
export interface AppState {
  dashboard: HomeState;
  requests: RequestsState;
}
