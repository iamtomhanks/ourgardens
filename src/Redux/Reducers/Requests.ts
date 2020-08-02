// Interfaces
import { Action } from 'Interfaces/Redux';
import {
  RequestStatus,
  // RequestState,
  // initRequestState,
  // APIRoute,
} from 'Interfaces/Requests';

export interface RequestsState {
  // getStateNodes: RequestState;
}

const initialState: RequestsState = {
  // getStateNodes: Object.assign(initRequestState, {}),
};

// use this to dynamically create reducers for each request state for each request
const propActionMap: {[key: string]: string} = {
  // getStateNodes: APIRoute.GET_STATE_NODES,
};

const requestsReducer = (
  state = initialState,
  action: Action,
): RequestsState => {
  let newState: RequestsState = { ...state };

  // instead of using a switch on static action types, dynamically create reducers
  Object.keys(propActionMap).forEach((key) => {
    const actionPreface = propActionMap[key];

    if (action.type === `${actionPreface}_STARTED`) {
      newState = {
        ...state,
        [key]: {
          ...state[key],
          status: RequestStatus.STARTED,
        },
      };
    } if (action.type === `${actionPreface}_SUCCESS`) {
      newState = {
        ...state,
        [key]: {
          ...state[key],
          status: RequestStatus.SUCCESS,
        },
      };
    } if (action.type === `${actionPreface}_ERROR`) {
      newState = {
        ...state,
        [key]: {
          ...state[key],
          status: RequestStatus.FAILURE,
          error: action.payload.error,
        },
      };
    }

    return newState;
  });

  return newState;
};

export {
  requestsReducer,
};
