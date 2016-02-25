import {IGlobalStore} from '../../stores/ui/global.store';
import {Action} from '../../actions/base.action';
import {initialGlobalStore} from '../../stores/ui/global.store';
import {BACKEND_CALL_FAILS} from '../../actions/app.actions';
import {OLD_SERVICE_ACTION_FINISHED} from '../../actions/services.actions';
import {OLD_SERVICE_ACTION_STARTED} from '../../actions/services.actions';
import {IOldServiceActionPayload} from '../../actions/services.actions';

export function globalReducer(state:IGlobalStore = initialGlobalStore, action:Action<any>):IGlobalStore {
  let newState:IGlobalStore;

  switch (action.type) {
    case OLD_SERVICE_ACTION_STARTED:
      newState = {
        actionOngoing: true,
        message: (action as Action<IOldServiceActionPayload>).payload.message
      };
      break;

    case OLD_SERVICE_ACTION_FINISHED:
      let serviceActionFinishedPayload:IOldServiceActionPayload = (action as Action<IOldServiceActionPayload>).payload;
      newState = {
        actionOngoing: false,
        message: serviceActionFinishedPayload.message ? serviceActionFinishedPayload.message : 'Ready'
      };
      break;

    case BACKEND_CALL_FAILS:
      newState = {
        actionOngoing: state.actionOngoing,
        message: (action as Action<Object>).payload['localizedMessage']
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
