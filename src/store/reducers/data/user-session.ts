import {UserLoginDto} from '../../../app/shared/stubs/dtos/user-login-dto';
import {TenantLoginDto} from '../../../app/shared/stubs/dtos/tenant-login-dto';
import {USERS_PERMISSIONS_LOADED} from '../../actions/session';

export class UserSessionStore {
  public user:UserLoginDto;
  public tenantId:number;
  public tenants:Array<TenantLoginDto>;
  public permissions:Array<any>;
  public userPreferences:Object;
}

export const initialUserSessionStore:UserSessionStore = new UserSessionStore();

export function userSessionReducer(state:UserSessionStore, action:any):UserSessionStore {
  if (!state) {
    return initialUserSessionStore;
  }

  let newState:UserSessionStore;
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
