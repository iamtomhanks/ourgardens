// Interfaces

// Constants
import { ActionTypes } from 'Constants';

export interface DashboardState {
 
}

const initialState: DashboardState = {

};

const dashboardReducer = (
  state = initialState,
  action: Action,
): DashboardState => {
  switch (action.type) {

    default: return state;
  }
};

export {
  dashboardReducer,
};
