import { combineReducers } from 'redux';
import authReducer from './reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

export default rootReducer;
