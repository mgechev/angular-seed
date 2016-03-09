import {Action} from '../../../store/actions/base.action';
import {initialBackendStore} from './backend.store';
import {BackendStore} from './backend.store';
import {BackendActions} from './backend.actions';

export function backendReducer(state:BackendStore, action:Action<any>):BackendStore
{
  if (!state)
  {
    return initialBackendStore;
  }

  let newState:BackendStore;

  switch (action.type)
  {

    case BackendActions.BACKEND_URL_SELECTED:
      newState = {
        backendUrlSelected: state.backendUrlSelected,
        backendUrl: action.payload,
        backendUrls: state.backendUrls
      };
      break;
    case BackendActions.BACKEND_URL_COMMITED:
      newState = {
        backendUrlSelected: true,
        backendUrl: state.backendUrl,
        backendUrls: state.backendUrls
      };
      break;
    case BackendActions.BACKEND_URL_DISCARDED:
      newState = {
        backendUrlSelected: false,
        backendUrl: state.backendUrl,
        backendUrls: state.backendUrls
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
