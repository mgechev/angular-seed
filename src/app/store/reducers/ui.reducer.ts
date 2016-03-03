import {Reducer, combineReducers} from 'redux';
import {appReducer} from './ui/app.reducer';
import {globalReducer} from './ui/global.reducer';

export const uiReducer:Reducer = combineReducers({
  global: globalReducer,
  app: appReducer
});
