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
      console.log('backend call started');
      let backendCallStartedPayload:BackendCallStartedActionPayload = (action as Action<BackendCallStartedActionPayload>).payload;
      newState = {
        actionOngoing: true,
        message: 'Backend Call Active: ' + backendCallStartedPayload.methodIdent
      };
      break;

    case BACKEND_CALL_SUCCEEDED:
      console.log('backend call succeeded');
      let backendCallSucceededPayload:BackendCallSucceededActionPayload = (action as Action<BackendCallSucceededActionPayload>).payload;
      newState = {
        actionOngoing: false,
        message: 'Backend Call Succeeded: ' + backendCallSucceededPayload.methodIdent
      };
      break;

    case BACKEND_CALL_FAILED:
      console.log('backend call failed');
      let backendCallFailedPayload:BackendCallFailedActionPayload = (action as Action<BackendCallFailedActionPayload>).payload;
      newState = {
        actionOngoing: false,
        message: 'Backend Call Failed: ' + backendCallFailedPayload.methodIdent
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
