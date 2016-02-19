import {SERVICE_ACTION_STARTED, SERVICE_ACTION_FINISHED} from '../actions/services';
import {APP_INITIALIZED} from '../actions/app';
import {BACKEND_CALL_FAILS} from '../actions/app';

const initialUiState = {
  initialized: false,
  actionOngoing: false,
  message: 'Ready'
};

function uiState(state, action) {
  if (!state) {
    return initialUiState;
  }

  let newState;
  switch (action.type) {
    case APP_INITIALIZED:
      newState = {
        initialized: true,
        actionOngoing: state.actionOngoing,
        message: state.message
      };
      break;

    case SERVICE_ACTION_STARTED:
      newState = {
        initialized: state.initialized,
        actionOngoing: true,
        message: action.message
      };
      break;

    case SERVICE_ACTION_FINISHED:
      newState = {
        initialized: state.initialized,
        actionOngoing: false,
        message: action.message ? action.message : 'Ready'
      };
      break;

    case BACKEND_CALL_FAILS:
      newState = {
        initialized: state.initialized,
        actionOngoing: state.actionOngoing,
        message: action.error['localizedMessage']
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}

export {initialUiState};
export {uiState};
