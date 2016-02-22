import {USER_IS_AUTHENTICATED} from '../actions/session';
import {USER_WANTS_TO_LOGIN} from '../actions/session';
import {LOGOUT_USER} from '../actions/session';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../actions/session';
import {ISessionStore} from '../stores/session.store';
import {initialSessionStore} from '../stores/session.store';

/**
 * Reducer for sessionState data-node
 *
 * @param {ISessionStore} state
 * @param {Object} action
 * @returns {ISessionStore}
 */
export function sessionStateReducer(state:ISessionStore = initialSessionStore, action:any):ISessionStore {

  let newState:ISessionStore;

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
