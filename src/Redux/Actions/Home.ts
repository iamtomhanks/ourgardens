// // Modules
import { Dispatch } from 'redux';

// // Constants
import { ActionTypes } from 'Constants';

// // Store
// import reduxStore from 'Redux/Store';

const test = () => (dispatch: Dispatch): void => {
  dispatch({
    type: ActionTypes.test,
    payload: {
    },
  });
};

export {
  test,
};
