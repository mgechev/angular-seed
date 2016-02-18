/**
 * Created by dellfort on 15/02/16.
 */

import {Injectable} from 'angular2/core';
import {createStore, combineReducers} from 'redux';
import {uiState, initialUiState} from './reducers/ui-state';
import {ReduxWrapper} from './ReduxWrapper';
import {sessionState, SessionState} from './reducers/session-state';
import {initialSessionState} from './reducers/session-state';

const state = combineReducers({
  uiState,
  sessionState
});

const store = createStore(
  state,
  {
    uiState: initialUiState,
    sessionState: initialSessionState
  }
);

@Injectable()
export class Store extends ReduxWrapper {
  constructor() {
    super(store);
  }

  public getUiState():Object {
    return this.getState().uiState;
  }

  public getSessionState():SessionState {
    return this.getState().sessionState;
  }
}
