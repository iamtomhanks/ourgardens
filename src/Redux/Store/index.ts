// Modules
import { applyMiddleware, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

// Reducers
import reducer from '../Reducers';

export default createStore(reducer, applyMiddleware(reduxThunk, reduxLogger));
