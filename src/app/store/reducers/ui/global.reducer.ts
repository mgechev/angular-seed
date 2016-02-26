import {IGlobalStore} from '../../stores/ui/global.store';
import {Action} from '../../actions/base.action';
import {initialGlobalStore} from '../../stores/ui/global.store';
import {OLD_SERVICE_ACTION_FINISHED} from '../../actions/services.actions';
import {OLD_SERVICE_ACTION_STARTED} from '../../actions/services.actions';
import {IOldServiceActionPayload} from '../../actions/services.actions';
import {BACKEND_CALL_STARTED} from '../../actions/services.actions';
import {BackendCallStartedActionPayload} from '../../actions/services.actions';
import {BACKEND_CALL_FAILED} from '../../actions/services.actions';
import {BackendCallFailedActionPayload} from '../../actions/services.actions';
import {BACKEND_CALL_SUCCEEDED} from '../../actions/services.actions';
import {BackendCallSucceededActionPayload} from '../../actions/services.actions';
import {getActionPayload} from '../../actions/base.action';

export function globalReducer(state:IGlobalStore = initialGlobalStore, action:Action<any>):IGlobalStore {
  let newState:IGlobalStore;

  console.group('Action \'' + action.type + '\'');

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

    case BACKEND_CALL_STARTED:
      let methodIdentStarted:string = getActionPayload<BackendCallStartedActionPayload>(action).methodIdent;
      newState = {
        actionOngoing: true,
        message: 'Backend Call Active: ' + methodIdentStarted
      };
      break;

    case BACKEND_CALL_SUCCEEDED:
      let methodIdentSucceeded:string = getActionPayload<BackendCallSucceededActionPayload<any>>(action).methodIdent;
      newState = {
        actionOngoing: false,
        message: 'Backend Call Succeeded: ' + methodIdentSucceeded
      };
      break;

    case BACKEND_CALL_FAILED:
      let methodIdentFailed:string = getActionPayload<BackendCallFailedActionPayload>(action).methodIdent;
      newState = {
        actionOngoing: false,
        message: 'Backend Call Failed: ' + methodIdentFailed
      };
      break;

    default:
      newState = state;
      break;
  }
  console.log('Old State:', state);
  console.log('New State:', newState);
  console.groupEnd();

  return newState;
}
