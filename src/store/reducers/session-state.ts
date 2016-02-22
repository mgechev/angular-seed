import {USER_IS_AUTHENTICATED} from '../actions/session';
import {USER_WANTS_TO_LOGIN} from '../actions/session';
import {LOGOUT_USER} from '../actions/session';
import {TenantLoginDto} from '../../app/shared/stubs/dtos/tenant-login-dto';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../actions/session';

/**
 * Typed definition of sessionState data-node in the store
 */
class SessionState {
  public loginAttempt:Object;
  public userAuthenticated:boolean = false;
  public tenants:Array<TenantLoginDto>;
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
    case ACTIVE_TENANTS_OF_USER_LOADED:
      newState = {
        userAuthenticated: false,
        loginAttempt: null,
        tenants: action.tenants
      };
      break;
    case USER_WANTS_TO_LOGIN:
      newState = {
        userAuthenticated: false,
        loginAttempt: {
          username: action.username,
          pasword: action.password,
          tenant: action.tenant
        },
        tenants: state.tenants
      };
      break;
    case LOGOUT_USER:
      newState = {
        userAuthenticated: false,
        loginAttempt: state.loginAttempt,
        tenants: state.tenants
      };
      break;

    case USER_IS_AUTHENTICATED:
      newState = {
        userAuthenticated: true,
        loginAttempt: null,
        tenants: null
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
