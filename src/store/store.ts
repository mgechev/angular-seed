/**
 * Created by dellfort on 15/02/16.
 */

import {Injectable} from 'angular2/core';
import {ReduxWrapper} from './ReduxWrapper';
import {createStore, combineReducers} from 'redux';

import {uiState, initialUiState} from './reducers/ui-state';
import {assignmentsState, initialAssignmentsState} from './reducers/assignments';
import {usersState, initialUsersState} from './reducers/users';

const state = combineReducers({
  uiState,
  usersState,
  assignmentsState
});

const store = createStore(
  state,
  {
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
}
