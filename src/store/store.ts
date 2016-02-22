import {ReduxWrapper} from './ReduxWrapper';
import {createStore, combineReducers} from 'redux';

import {uiState} from './reducers/ui-state';
import {sessionState} from './reducers/session-store';
import {initialSessionStore} from './reducers/session-store';
import {assignmentsState, initialAssignmentsState} from './reducers/assignments';
import {usersState, initialUsersState} from './reducers/users';
import {dataStoreReducer} from './reducers/data';
import {ISessionStore} from './reducers/session-store';
import {activeModule, initialActiveModule} from './reducers/modules-state';
import {IDataStore} from './stores/data-store';
import {initialDataStore} from './stores/data-store';
import {initialUiStateStore} from './stores/ui-state.store';
import {Injectable} from 'angular2/core';

export interface IRootStore {
  data: IDataStore;
  activeModule: string;
  uiState: Object;
  sessionState: ISessionStore;
  usersState: Object;
  assignmentsState: Object;
}

const initialRootStore:IRootStore = {
  data: initialDataStore,
  activeModule: initialActiveModule,
  uiState: initialUiStateStore,
  sessionState: initialSessionStore,
  usersState: initialUsersState,
  assignmentsState: initialAssignmentsState
};

/**
 * Combine all reducers from application.
 * NOTE:
 * The name of the reducer is at the same time the name of the data-node in the store.
 */
const rootReducer = combineReducers({
  data: dataStoreReducer,
  activeModule,
  uiState,
  sessionState,
  usersState,
  assignmentsState
});

/**
 * Creates the store with the combined reducers and an initial state of all data-nodes.
 */
const rootStore = createStore(
  rootReducer,
  initialRootStore
);

/**
 * Wrapper for specific access to data-nodes.
 * Maybe there exists a small inheritence of stores later in the development.
 */
@Injectable()
export class Store extends ReduxWrapper {
  constructor() {
    super(rootStore);
  }

  /**
   * Specific access to store-node of data
   */
  public getDataStore():IDataStore {
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
  public getSessionState():ISessionStore {
    return this.getState().sessionState;
  }
}
