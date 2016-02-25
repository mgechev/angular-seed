import {IGlobalStore} from '../../stores/ui/global.store';
import {Action} from '../../actions/base.action';
import {initialGlobalStore} from '../../stores/ui/global.store';
import {BACKEND_CALL_FAILS} from '../../actions/app.actions';
import {SERVICE_ACTION_FINISHED} from '../../actions/services.actions';
import {SERVICE_ACTION_STARTED} from '../../actions/services.actions';
import {IServiceActionStartedAction} from '../../actions/services.actions';
import {IServiceActionFinishedAction} from '../../actions/services.actions';
import {IBackendCallFailsAction} from '../../actions/app.actions';

export function globalReducer(state:IGlobalStore = initialGlobalStore, action:Action):IGlobalStore {
  let newState:IGlobalStore;

  switch (action.type) {
    case SERVICE_ACTION_STARTED:
      newState = {
        actionOngoing: true,
        message: (action as IServiceActionStartedAction).message
      };
      break;

    case SERVICE_ACTION_FINISHED:
      newState = {
        actionOngoing: false,
        message: (action as IServiceActionFinishedAction).message ? (action as IServiceActionFinishedAction).message : 'Ready'
      };
      break;

    case BACKEND_CALL_FAILS:
      newState = {
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
