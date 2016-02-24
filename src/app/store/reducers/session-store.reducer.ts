import {USER_IS_AUTHENTICATED} from '../actions/session.actions';
import {USER_WANTS_TO_LOGIN} from '../actions/session.actions';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../actions/session.actions';
import {ISessionStore} from '../stores/session.store';
import {initialSessionStore} from '../stores/session.store';
import {IBaseAction} from '../actions/base.action';
import {IActiveTenantsOfUserLoadedAction} from '../actions/session.actions';
import {IUsernameProvidedAction,IPasswordProvidedAction,ITenantProvidedAction} from '../actions/session.actions';
import {LOGOUT_USER} from '../actions/session.actions';
import {IUserIsAuthenticatedAction} from '../actions/session.actions';
import {USER_PROVIDED_USERNAME} from '../actions/session.actions';
import {SESSION_USER_EXISTS} from '../actions/session.actions';
import {BACKEND_AUTHENTICATION_INITIALIZED} from '../actions/session.actions';
import {LOGGEDIN_USER_REQUIRED} from '../actions/session.actions';
import {USER_LOGOUT_REQUEST} from '../actions/session.actions';
import {BACKEND_USER_INQUIRY_INITIALIZED} from '../actions/session.actions';
import {USER_PROVIDED_TENANT} from '../actions/session.actions';
import {USER_PROVIDED_PASSWORD} from '../actions/session.actions';


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
    case LOGGEDIN_USER_REQUIRED:
      newState = loggedInUserRequiredReducer(state);
      break;

    case BACKEND_USER_INQUIRY_INITIALIZED:
      newState = backendUserInquiryInitializedReducer(state);
      break;

    case SESSION_USER_EXISTS:
      newState = sessionUserExistsReducer(state, action as IUsernameProvidedAction);
      break;

    case USER_PROVIDED_USERNAME:
      newState = userProvidedUsernameReducer(state, action as IUsernameProvidedAction);
      break;

    case USER_PROVIDED_PASSWORD:
      newState = userProvidedPasswordReducer(state, action as IPasswordProvidedAction);
      break;


    case USER_PROVIDED_TENANT:
      newState = userProvidedTenantReducer(state, action as ITenantProvidedAction);
      break;

    case ACTIVE_TENANTS_OF_USER_LOADED:
      newState = activeTenantsOfUserLoadedReducer(state, action as IActiveTenantsOfUserLoadedAction);
      break;

    case USER_WANTS_TO_LOGIN:
      newState = userWantsToLoginReducer(state, action as IBaseAction);
      break;

    case BACKEND_AUTHENTICATION_INITIALIZED:
      newState = backendAuthenticationInitialized(state);
      break;

    case USER_LOGOUT_REQUEST:
      newState = userLogoutRequestReducer(state, action as IBaseAction);
      break;

    case LOGOUT_USER:
      newState = logoutUserReducer(state, action as IBaseAction);
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

function loggedInUserRequiredReducer(state:ISessionStore):ISessionStore {
  return {
    loggedInUserRequired: true,
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    sessionUserExists: state.sessionUserExists,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: state.backendAuthenticationInitialized,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}

function sessionUserExistsReducer(state:ISessionStore, action:IUsernameProvidedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists: true,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: state.backendAuthenticationInitialized,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}


function userProvidedUsernameReducer(state:ISessionStore, action:IUsernameProvidedAction):ISessionStore {

  return {
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    loggedInUserRequired: state.loggedInUserRequired,
    sessionUserExists: state.sessionUserExists,
    providedUsername: action.username,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: state.backendAuthenticationInitialized,
    userAuthenticated: false,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: null
  };
}

function userProvidedPasswordReducer(state:ISessionStore, action:IPasswordProvidedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    loggedInUserRequired: state.loggedInUserRequired,
    sessionUserExists: state.sessionUserExists,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: action.password,
    backendAuthenticationInitialized: state.backendAuthenticationInitialized,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}

function userProvidedTenantReducer(state:ISessionStore, action:ITenantProvidedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    loggedInUserRequired: state.loggedInUserRequired,
    sessionUserExists: state.sessionUserExists,
    providedUsername: state.providedUsername,
    providedTenant: action.tenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: state.backendAuthenticationInitialized,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}

function activeTenantsOfUserLoadedReducer(state:ISessionStore, action:IActiveTenantsOfUserLoadedAction):ISessionStore {

  return {
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    loggedInUserRequired: state.loggedInUserRequired,
    sessionUserExists: state.sessionUserExists,
    providedUsername: state.providedUsername,
    providedTenant: action.tenants && action.tenants.length > 0 ? action.tenants[0].name : state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: false,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: action.tenants
  };
}

function backendUserInquiryInitializedReducer(state:ISessionStore):ISessionStore {
  return {
    backendUserInquiryInitialized: true,
    loggedInUserRequired: false,
    sessionUserExists: false,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: true,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}

function userWantsToLoginReducer(state:ISessionStore, action:IBaseAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists: false,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: {
      username: state.providedUsername,
      password: state.providedPassword,
      tenant: state.providedTenant
    },
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}

function backendAuthenticationInitialized(state:ISessionStore):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists: false,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: true,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}

function userIsAuthenticatedReducer(state:ISessionStore, action:IUserIsAuthenticatedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    loggedInUserRequired: state.loggedInUserRequired,
    sessionUserExists: state.sessionUserExists,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: false,
    userAuthenticated: true,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: state.userLogoutRequest,
    tenants: state.tenants
  };
}

function userLogoutRequestReducer(state:ISessionStore, action:IBaseAction):ISessionStore {
  return {
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    loggedInUserRequired: state.loggedInUserRequired,
    sessionUserExists: state.sessionUserExists,
    providedUsername: state.providedUsername,
    providedTenant: state.providedTenant,
    providedPassword: state.providedPassword,
    backendAuthenticationInitialized: state.backendAuthenticationInitialized,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    userLogoutRequest: true,
    tenants: state.tenants
  };
}

function logoutUserReducer(state:ISessionStore, action:IBaseAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists: false,
    providedUsername: null,
    providedTenant: null,
    providedPassword: null,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: null,
    userLogoutRequest: false,
    tenants: null
  };
}


