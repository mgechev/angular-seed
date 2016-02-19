import {UserSessionStore} from './data/user-session';

export class DataStore {
  public userSession:UserSessionStore = new UserSessionStore();
}

export const initialDataStore:DataStore = new DataStore();

export function dataStoreReducer(state:DataStore, action:any):DataStore {
  if (!state) {
    return initialDataStore;
  }

  let newState:DataStore;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return newState;
}
