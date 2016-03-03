import {assignmentsStateReducer} from './assignments.reducer';
import {usersStateReducer} from './users.reducer';
import {uiReducer} from './ui.reducer';
import {activeModuleReducer} from './modules-state.reducer';
import {Reducer, combineReducers}from 'redux';
import {coreReducer} from './core.reducer';
import {featuresReducer} from './features.reducer';

/**
 * Combine all reducers from application.
 * NOTE:
 * The name of the reducer is at the same time the name of the data-node in the store.
 */
export const rootReducer:Reducer = combineReducers({
  core: coreReducer,
  features: featuresReducer,
  activeModule: activeModuleReducer,
  ui: uiReducer,
  usersState: usersStateReducer,
  assignmentsState: assignmentsStateReducer
});
