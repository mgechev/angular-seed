import {combineReducers} from 'redux';
import {userSessionReducer} from './data/user-session.reducer';

export const dataStoreReducer = combineReducers({
  userSession: userSessionReducer
});
