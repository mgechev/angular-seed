import {USER_AUTHENTICATED} from '../actions/session';

class SessionState {
  public userAuthenticated:boolean = false;
}

const initialSessionState:SessionState = new SessionState();

function sessionState(state:SessionState, action:any):SessionState {
  if (!state) {
    return initialSessionState;
  }

  let newState:SessionState;

  switch (action.type) {
    case USER_AUTHENTICATED:
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
