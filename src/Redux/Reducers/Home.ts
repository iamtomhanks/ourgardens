// Interfaces
import { Action } from 'Interfaces/Redux';

// Constants
// import { ActionTypes } from 'Constants';

export interface HomeState {
 
}

const initialState: HomeState = {

};

const homeReducer = (
  state = initialState,
  action: Action,
): HomeState => {
  switch (action.type) {

    default: return state;
  }
};

export {
  homeReducer,
};
