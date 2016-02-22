import {IUserSessionStore} from './data-store/user-session-store';
import {initialUserSessionStore} from './data-store/user-session-store';

export interface IDataStore {
  userSession:IUserSessionStore;
}

export const initialDataStore:IDataStore = {
  userSession: initialUserSessionStore
};
