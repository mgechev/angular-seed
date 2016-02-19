import {Injectable} from 'angular2/core';
import {ReduxWrapper} from './ReduxWrapper';
import {createStore, combineReducers} from 'redux';

import {uiState, initialUiState} from './reducers/ui-state';
import {sessionState, SessionState} from './reducers/session-state';
import {initialSessionState} from './reducers/session-state';
import {assignmentsState, initialAssignmentsState} from './reducers/assignments';
import {usersState, initialUsersState} from './reducers/users';
import {initialDataStore} from './reducers/data';
import {DataStore} from './reducers/data';
import {dataStoreReducer} from './reducers/data';

/**
 * Combine all reducers from application.
 * NOTE:
 * The name of the reducer is at the same time the name of the data-node in the store.
 */
const state = combineReducers({
  data: dataStoreReducer,
  uiState,
  sessionState,
  usersState,
  assignmentsState
});

/**
 * Creates the store with the combined reducers and an initial state of all data-nodes.
 */
const store = createStore(
  state,
  {
    data: initialDataStore,
    uiState: initialUiState,
    sessionState: initialSessionState,
    usersState: initialUsersState,
    assignmentsState: initialAssignmentsState
  }
);

/**
 * Wrapper for specific access to data-nodes.
 * Maybe there exists a small inheritence of stores later in the development.
 */
@Injectable()
export class Store extends ReduxWrapper {
  constructor() {
    super(store);
  }

  /**
   * Specific access to store-node of data
   */
  public getDataStore():DataStore {
    return this.getState().data;
  }

  /**
   * Specific access to data-node of uiState
   */
  public getUiState():Object {
    return this.getState().uiState;
  }

  /**
   * Specific access to data-node of sessionState
   */
  public getSessionState():SessionState {
    return this.getState().sessionState;
  }
}
