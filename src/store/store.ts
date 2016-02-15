/**
 * Created by dellfort on 15/02/16.
 */

import {Injectable} from 'angular2/core';
import {createStore, combineReducers} from 'redux';
import {uiState, initialUiState} from './reducers/ui-state';
import {ReduxWrapper} from './ReduxWrapper';

const state = combineReducers({
  uiState
});

const store = createStore(
  state,
  {
    uiState: initialUiState
  }
);

@Injectable()
export class Store extends ReduxWrapper {
  constructor() {
    super(store);
  }
}
