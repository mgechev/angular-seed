import {combineReducers} from 'redux';
import {userSessionReducer} from './data/user-session.reducer';
import Reducer = Redux.Reducer;

export const dataStoreReducer:Reducer = combineReducers({
  userSession: userSessionReducer
});
