import {UserLoginDto} from '../../../app/shared/stubs/dtos/user-login-dto';
import {TenantLoginDto} from '../../../app/shared/stubs/dtos/tenant-login-dto';
import {USERS_PERMISSIONS_LOADED} from '../../actions/session';

export interface IUserSessionStore {
  user:UserLoginDto;
  tenantId:number;
  tenants:Array<TenantLoginDto>;
  permissions:Array<any>;
  userPreferences:Object;
}

export const initialUserSessionStore:IUserSessionStore = {
  user: null,
  tenantId: null,
  tenants: null,
  permissions: null,
  userPreferences: null
};

export function userSessionReducer(state:IUserSessionStore = initialUserSessionStore, action:any):IUserSessionStore {

  let newState:IUserSessionStore;
  switch (action.type) {
    case USERS_PERMISSIONS_LOADED:
      newState = {
        user: state.user,
        tenantId: state.tenantId,
        tenants: state.tenants,
        permissions: action.permissions,
        userPreferences: state.userPreferences
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
