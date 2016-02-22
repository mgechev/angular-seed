import {USER_IS_AUTHENTICATED} from '../actions/session.actions';
import {USER_WANTS_TO_LOGIN} from '../actions/session.actions';
import {LOGOUT_USER} from '../actions/session.actions';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../actions/session.actions';
import {ISessionStore} from '../stores/session.store';
import {initialSessionStore} from '../stores/session.store';
import {IBaseAction} from '../actions/base.action';
import {IActiveTenantsOfUserLoadedAction} from '../actions/session.actions';
import {IUserWantsToLoginAction} from '../actions/session.actions';
import {ILogoutUserAction} from '../actions/session.actions';
import {IUserIsAuthenticatedAction} from '../actions/session.actions';

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
      newState = activeTenantsOfUserLoadedReducer(state, action as IActiveTenantsOfUserLoadedAction);
      break;

    case USER_WANTS_TO_LOGIN:
      newState = userWantsToLoginReducer(state, action as IUserWantsToLoginAction);
      break;

    case LOGOUT_USER:
      newState = logoutUserReducer(state, action as ILogoutUserAction);
      break;

    case USER_IS_AUTHENTICATED:
      newState = userIsAuthenticatedReducer(state, action as IUserIsAuthenticatedAction);
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}

function activeTenantsOfUserLoadedReducer(state:ISessionStore, action:IActiveTenantsOfUserLoadedAction):ISessionStore {
  return {
    userAuthenticated: false,
    loginAttempt: null,
    tenants: action.tenants
  };
}

function userWantsToLoginReducer(state:ISessionStore, action:IUserWantsToLoginAction):ISessionStore {
  return {
    userAuthenticated: false,
    loginAttempt: {
      username: action.username,
      pasword: action.password,
      tenant: action.tenant
    },
    tenants: state.tenants
  };
}

function logoutUserReducer(state:ISessionStore, action:ILogoutUserAction):ISessionStore {
  return {
    userAuthenticated: false,
    loginAttempt: state.loginAttempt,
    tenants: state.tenants
  };
}

function userIsAuthenticatedReducer(state:ISessionStore, action:IUserIsAuthenticatedAction):ISessionStore {
  return {
    userAuthenticated: true,
    loginAttempt: null,
    tenants: null
  };
}
