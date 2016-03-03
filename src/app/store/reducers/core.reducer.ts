import {CoreStore} from '../stores/core.store';
import {Action} from '../actions/base.action';
import {initialCoreStore} from '../stores/core.store';

export function coreReducer(state:CoreStore, action:Action<any>):CoreStore {
  if (!state) {
    return initialCoreStore;
  }

  let newState:CoreStore;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return newState;
}
