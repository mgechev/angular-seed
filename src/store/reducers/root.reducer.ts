import {assignmentsState} from './assignments.reducer';
import {usersState} from './users.reducer';
import {sessionState} from './session-store.reducer';
import {uiState} from './ui-state.reducer';
import {activeModule} from './modules-state';
import {dataStoreReducer} from './data.reducer';
import {Reducer, combineReducers}from 'redux';

/**
 * Combine all reducers from application.
 * NOTE:
 * The name of the reducer is at the same time the name of the data-node in the store.
 */
export const rootReducer:Reducer = combineReducers({
  data: dataStoreReducer,
  activeModule: activeModule,
  uiState: uiState,
  sessionState: sessionState,
  usersState: usersState,
  assignmentsState: assignmentsState
});
