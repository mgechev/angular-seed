import {IUserSessionStore} from '../../stores/data/user-session.store';
import {Action} from '../../actions/base.action';
import {initialUserSessionStore} from '../../stores/data/user-session.store';
import {AuthPermissionDto} from '../../../shared/stubs/dtos/auth-permission-dto';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../shared/stubs/dtos/user-login-dto';
import {BACKEND_CALL_SUCCEEDED} from '../../actions/services.actions';
import {BackendCallSucceededActionPayload} from '../../actions/services.actions';
import {ServiceMethods} from '../../../shared/stubs/services/meta/service-methods';
import {getActionPayload} from '../../actions/base.action';

export function userSessionReducer(state:IUserSessionStore = initialUserSessionStore, action:Action<any>):IUserSessionStore {
  let newState:IUserSessionStore;

  switch (action.type) {

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

        case ServiceMethods.LoginService.authenticate:
          let userLoginDto:UserLoginDto = getActionPayload<BackendCallSucceededActionPayload<UserLoginDto>>(action).result;
          newState = {
            user: userLoginDto,
            tenantId: state.tenantId,
            tenants: state.tenants,
            permissions: state.permissions,
            userPreferences: state.userPreferences
          };
          break;

        case ServiceMethods.LoginService.logout:
          newState = initialUserSessionStore;
          break;

        case ServiceMethods.UserAuthorizationService.getPermissions:
          let permissions:Array<AuthPermissionDto> =
            getActionPayload < BackendCallSucceededActionPayload<Array<AuthPermissionDto>>>(action).result;
          newState = {
            user: state.user,
            tenantId: state.tenantId,
            tenants: state.tenants,
            permissions: permissions,
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
