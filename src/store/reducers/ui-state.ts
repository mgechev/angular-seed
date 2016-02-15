/**
 * Created by dellfort on 15/02/16.
 */

import {SERVICE_ACTION_STARTED, SERVICE_ACTION_FINISHED} from '../actions/services';

const initialUiState = {
  actionOngoing: false,
  message: 'Ready'
};

function uiState(state, action) {
  if (!state) {
    return {
      actionOngoing: false,
      message: 'Ready'
    };
  }
  switch(action.type) {
    case SERVICE_ACTION_STARTED:
      return {
        actionOngoing:true,
        message: action.message
      };
    case SERVICE_ACTION_FINISHED:
    default:
      return {
        actionOngoing: false,
        message: action.message ? action.message : 'Ready'
      };
  }
}

export {initialUiState};
export {uiState};
