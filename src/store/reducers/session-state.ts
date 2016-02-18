import {USER_IS_AUTHENTICATED} from '../actions/session';

/**
 * Typed definition of sessionState data-node in the store
 */
class SessionState {
  public userAuthenticated:boolean = false;
}

/**
 * Holds initial state of sessionState data-node
 *
 * @type {SessionState}
 */
const initialSessionState:SessionState = new SessionState();

/**
 * Reducer for sessionState data-node
 *
 * @param {SessionState} state
 * @param {Object} action
 * @returns {SessionState}
 */
function sessionState(state:SessionState, action:any):SessionState {
  if (!state) {
    return initialSessionState;
  }

  let newState:SessionState;

  switch (action.type) {
    case USER_IS_AUTHENTICATED:
      newState = {
        userAuthenticated: true
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}

export {SessionState};
export {initialSessionState};
export {sessionState};
