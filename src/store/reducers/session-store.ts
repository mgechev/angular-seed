import {USER_IS_AUTHENTICATED} from '../actions/session';
import {USER_WANTS_TO_LOGIN} from '../actions/session';
import {TenantLoginDto} from '../../app/shared/stubs/dtos/tenant-login-dto';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../actions/session';

export interface ISessionStore {
  loginAttempt:Object;
  userAuthenticated:boolean;
  tenants:Array<TenantLoginDto>;
}

/**
 * Holds initial state of sessionState data-node
 *
 * @type {ISessionStore}
 */
export const initialSessionStore:ISessionStore = {
  loginAttempt: null,
  userAuthenticated: false,
  tenants: null
};

/**
 * Reducer for sessionState data-node
 *
 * @param {ISessionStore} state
 * @param {Object} action
 * @returns {ISessionStore}
 */
export function sessionState(state:ISessionStore = initialSessionStore, action:any):ISessionStore {

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
