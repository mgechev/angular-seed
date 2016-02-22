import {combineReducers} from 'redux';
import {userSessionReducer} from './data/user-session';

export const dataStoreReducer = combineReducers({
  userSession: userSessionReducer
});
