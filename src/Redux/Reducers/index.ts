// Modules
import { combineReducers } from 'redux';

// Reducers
import { homeReducer as home } from './Home';
import { requestsReducer as requests } from './Requests';

export default combineReducers({
  home,
  requests,
});
