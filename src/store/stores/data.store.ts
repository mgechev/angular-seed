import {IUserSessionStore} from './data/user-session.store';
import {initialUserSessionStore} from './data/user-session.store';

export interface IDataStore {
  userSession:IUserSessionStore;
}

export const initialDataStore:IDataStore = {
  userSession: initialUserSessionStore
};
