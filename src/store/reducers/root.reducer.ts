import {assignmentsStateReducer} from './assignments.reducer';
import {usersStateReducer} from './users.reducer';
import {sessionStateReducer} from './session-store.reducer';
import {uiStateReducer} from './ui-state.reducer';
import {activeModuleReducer} from './modules-state.reducer';
import {dataStoreReducer} from './data.reducer';
import {Reducer, combineReducers}from 'redux';

/**
 * Combine all reducers from application.
 * NOTE:
 * The name of the reducer is at the same time the name of the data-node in the store.
 */
export const rootReducer:Reducer = combineReducers({
  data: dataStoreReducer,
  activeModule: activeModuleReducer,
  uiState: uiStateReducer,
  sessionState: sessionStateReducer,
  usersState: usersStateReducer,
  assignmentsState: assignmentsStateReducer
});
