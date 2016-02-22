import {combineReducers} from 'redux';
import {userSessionReducer} from './data/user-session';
import {IUserSessionStore} from './data/user-session';
import {initialUserSessionStore} from './data/user-session';

export interface IDataStore {
  userSession:IUserSessionStore;
}

export const initialDataStore:IDataStore = {
  userSession: initialUserSessionStore
};

export const dataStoreReducer = combineReducers({
  userSession: userSessionReducer
});
