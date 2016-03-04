import {Action} from '../../../store/actions/base.action';
import {BACKEND_URL_SELECTED} from './backend.actions';
import {initialBackendStore} from './backend.store';
import {BackendStore} from './backend.store';

export function backendReducer(state:BackendStore, action:Action<any>):BackendStore {
  if (!state) {
    return initialBackendStore;
  }

  let newState:BackendStore;

  switch (action.type) {

    case BACKEND_URL_SELECTED:
      newState = {
        backendUrl: action.payload,
        backendUrls: state.backendUrls
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
