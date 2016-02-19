import {UserSessionStore} from './data/user-session';
import {combineReducers} from 'redux';
import {userSessionReducer} from './data/user-session';

export class DataStore {
  public userSession:UserSessionStore = new UserSessionStore();
}

export const initialDataStore:DataStore = new DataStore();

export const dataStoreReducer = combineReducers({
  userSession: userSessionReducer
});
