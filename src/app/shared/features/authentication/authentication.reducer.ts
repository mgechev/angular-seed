import {AuthenticationStore} from './authentication.store';
import {Action} from '../../../store/actions/base.action';
import {initialAuthenticationStore} from './authentication.store';

export function authenticationReducer(store:AuthenticationStore, action:Action<any>):AuthenticationStore {
  if (!store) {
    return initialAuthenticationStore;
  }

  let newStore:AuthenticationStore;
  switch (action.type) {
    default:
      newStore = store;
      break;
  }

  return newStore;
}
