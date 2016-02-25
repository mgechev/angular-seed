import {USERS_PERMISSIONS_LOADED} from '../../actions/session.actions';
import {IUserSessionStore} from '../../stores/data/user-session.store';
import {Action} from '../../actions/base.action';
import {initialUserSessionStore} from '../../stores/data/user-session.store';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../../actions/session.actions';
import {USER_IS_AUTHENTICATED} from '../../actions/session.actions';
import {AuthPermissionDto} from '../../../shared/stubs/dtos/auth-permission-dto';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../shared/stubs/dtos/user-login-dto';

export function userSessionReducer(state:IUserSessionStore = initialUserSessionStore, action:Action<any>):IUserSessionStore {
  let newState:IUserSessionStore;

  switch (action.type) {
    case USERS_PERMISSIONS_LOADED:
      newState = {
        user: state.user,
        tenantId: state.tenantId,
        tenants: state.tenants,
        permissions: (action as Action<Array<AuthPermissionDto>>).payload,
        userPreferences: state.userPreferences
      };
      break;

    case ACTIVE_TENANTS_OF_USER_LOADED:
      newState = {
        user: state.user,
        tenantId: state.tenantId,
        tenants: (action as Action<Array<TenantLoginDto>>).payload,
        permissions: state.permissions,
        userPreferences: state.userPreferences
      };
      break;

    case USER_IS_AUTHENTICATED:
      newState = {
        user: (action as Action<UserLoginDto>).payload,
        tenantId: state.tenantId,
        tenants: state.tenants,
        permissions: state.permissions,
        userPreferences: state.userPreferences
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
