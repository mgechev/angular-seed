import {USERS_PERMISSIONS_LOADED} from '../../actions/session.actions';
import {IUserSessionStore} from '../../stores/data/user-session.store';
import {Action} from '../../actions/base.action';
import {initialUserSessionStore} from '../../stores/data/user-session.store';
import {USER_IS_AUTHENTICATED} from '../../actions/session.actions';
import {AuthPermissionDto} from '../../../shared/stubs/dtos/auth-permission-dto';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../shared/stubs/dtos/user-login-dto';
import {USER_LOGGED_OUT} from '../../actions/session.actions';
import {BACKEND_CALL_SUCCEEDED} from '../../actions/services.actions';
import {BackendCallSucceededActionPayload} from '../../actions/services.actions';
import {ServiceMethods} from '../../../shared/stubs/services/meta/service-methods';
import {getActionPayload} from '../../actions/base.action';

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

    case USER_IS_AUTHENTICATED:
      newState = {
        user: (action as Action<UserLoginDto>).payload,
        tenantId: state.tenantId,
        tenants: state.tenants,
        permissions: state.permissions,
        userPreferences: state.userPreferences
      };
      break;

    case USER_LOGGED_OUT:
      newState = initialUserSessionStore;
      break;

    case BACKEND_CALL_SUCCEEDED:
      let methodIdentSucceeded:string = getActionPayload<BackendCallSucceededActionPayload<any>>(action).methodIdent;

      switch (methodIdentSucceeded) {
        case ServiceMethods.LoginService.findActiveTenantsByUser:
          let activeTenants:Array<TenantLoginDto> =
            getActionPayload<BackendCallSucceededActionPayload<Array<TenantLoginDto>>>(action).result;
          newState = {
            user: state.user,
            tenantId: state.tenantId,
            tenants: activeTenants,
            permissions: state.permissions,
            userPreferences: state.userPreferences
          };
          break;

        default:
          newState = state;
          break;
      }
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
