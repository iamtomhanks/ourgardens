// Modules
import { combineReducers } from 'redux';

// Reducers
import { dashboardReducer as dashboard } from './Dashboard';
import { requestsReducer as requests } from './Requests';

export default combineReducers({
  dashboard,
  requests,
});
