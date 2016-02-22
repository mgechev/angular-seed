import {ReduxWrapper} from './ReduxWrapper';
import {createStore} from 'redux';
import {initialRootStore} from './stores/root.store';
import {rootReducer} from './reducers/root.reducer';
import {IDataStore} from './stores/data.store';
import {IUiStateStore} from './stores/ui-state.store';
import {ISessionStore} from './stores/session.store';
import {IRootStore} from './stores/root.store';

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
export class Store extends ReduxWrapper {
  constructor() {
    super(rootStore);
  }

  public getState():IRootStore {
    return super.getState();
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
  public getUiState():IUiStateStore {
    return this.getState().uiState;
  }

  /**
   * Specific access to data-node of sessionState
   */
  public getSessionState():ISessionStore {
    return this.getState().sessionState;
  }
}
