// Interfaces
import { DashboardState } from 'Redux/Reducers/Dashboard';
import { RequestsState } from 'Redux/Reducers/Requests';

export interface Action {
  type: string;
  payload: {[key: string]: unknown};
}

// Store
export interface AppState {
  dashboard: DashboardState;
  requests: RequestsState;
}
