import {SERVICE_ACTION_STARTED, SERVICE_ACTION_FINISHED} from '../actions/services.actions';
import {APP_INITIALIZED} from '../actions/app.actions';
import {BACKEND_CALL_FAILS} from '../actions/app.actions';
import {initialUiStateStore} from '../stores/ui-state.store';
import {IUiStateStore} from '../stores/ui-state.store';
import {IBaseAction} from '../actions/base.action';
import {IServiceActionStartedAction} from '../actions/services.actions';
import {IServiceActionFinishedAction} from '../actions/services.actions';
import {IBackendCallFailsAction} from '../actions/app.actions';
import {ITypedAction} from '../actions/typed.action';
import {UserLoginDto} from '../../app/shared/stubs/dtos/user-login-dto';
import {reduceType} from './base/base.reducer';

export function uiStateReducer(state:IUiStateStore = initialUiStateStore, action:IBaseAction):IUiStateStore {
  let newState:IUiStateStore;

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
        message: (action as IServiceActionStartedAction).message
      };
      break;

    case SERVICE_ACTION_FINISHED:
      newState = {
        initialized: state.initialized,
        actionOngoing: false,
        message: (action as IServiceActionFinishedAction).message ? (action as IServiceActionFinishedAction).message : 'Ready'
      };
      break;

    case BACKEND_CALL_FAILS:
      newState = {
        initialized: state.initialized,
        actionOngoing: state.actionOngoing,
        message: (action as IBackendCallFailsAction).error['localizedMessage']
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
