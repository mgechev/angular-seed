import {USER_IS_AUTHENTICATED} from '../actions/session.actions';
import {USER_WANTS_TO_LOGIN} from '../actions/session.actions';
import {LOGOUT_USER} from '../actions/session.actions';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../actions/session.actions';
import {ISessionStore} from '../stores/session.store';
import {initialSessionStore} from '../stores/session.store';
import {IBaseAction} from '../actions/base.action';
import {IActiveTenantsOfUserLoadedAction} from '../actions/session.actions';
import {IUserWantsToLoginAction} from '../actions/session.actions';

/**
 * Reducer for sessionState data-node
 *
 * @param {ISessionStore} state
 * @param {Object} action
 * @returns {ISessionStore}
 */
export function sessionStateReducer(state:ISessionStore = initialSessionStore, action:IBaseAction):ISessionStore {

  let newState:ISessionStore;

  switch (action.type) {
    case ACTIVE_TENANTS_OF_USER_LOADED:
      newState = {
        userAuthenticated: false,
        loginAttempt: null,
        tenants: (action as IActiveTenantsOfUserLoadedAction).tenants
      };
      break;
    case USER_WANTS_TO_LOGIN:
      newState = {
        userAuthenticated: false,
        loginAttempt: {
          username: (action as IUserWantsToLoginAction).username,
          pasword: (action as IUserWantsToLoginAction).password,
          tenant: (action as IUserWantsToLoginAction).tenant
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
