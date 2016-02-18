import {Injectable} from 'angular2/core';
import {ReduxWrapper} from './ReduxWrapper';
import {createStore, combineReducers} from 'redux';

import {uiState, initialUiState} from './reducers/ui-state';
import {sessionState, SessionState} from './reducers/session-state';
import {initialSessionState} from './reducers/session-state';
import {assignmentsState, initialAssignmentsState} from './reducers/assignments';
import {usersState, initialUsersState} from './reducers/users';

const state = combineReducers({
  uiState,
  sessionState,
  usersState,
  assignmentsState
});

const store = createStore(
  state,
  {
    uiState: initialUiState,
    sessionState: initialSessionState,
    uiState: initialUiState,
    usersState: initialUsersState,
    assignmentsState: initialAssignmentsState
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
