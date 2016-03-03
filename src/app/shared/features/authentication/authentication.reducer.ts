import {Action} from '../../../store/actions/base.action';
import {ServiceMethods} from '../../stubs/services/meta/service-methods';
import {BACKEND_CALL_SUCCEEDED} from '../../../store/actions/services.actions';
import {BackendCallSucceededActionPayload} from '../../../store/actions/services.actions';
import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {getActionPayload} from '../../../store/actions/base.action';
import {UserLoginDto} from '../../stubs/dtos/user-login-dto';
import {AuthPermissionDto} from '../../stubs/dtos/auth-permission-dto';
import {UserSessionStore} from './authentication.store';
import {combineReducers,Reducer} from 'redux';
import {initialUserSessionStore} from './authentication.store';

export const authenticationReducer:Reducer = combineReducers({
  userSession: userSessionReducer
});

function userSessionReducer(store:UserSessionStore, action:Action<any>):UserSessionStore {
  if (!store) {
    return initialUserSessionStore;
  }

  let newStore:UserSessionStore;
  switch (action.type) {

    case BACKEND_CALL_SUCCEEDED:
      let methodIdentSucceeded:string = getActionPayload<BackendCallSucceededActionPayload<any>>(action).methodIdent;

      switch (methodIdentSucceeded) {
        case ServiceMethods.LoginService.findActiveTenantsByUser:
          let activeTenants:Array<TenantLoginDto> =
            getActionPayload<BackendCallSucceededActionPayload<Array<TenantLoginDto>>>(action).result;
          newStore = {
            user: store.user,
            tenantId: store.tenantId,
            tenants: activeTenants,
            permissions: store.permissions,
            userPreferences: store.userPreferences
          };
          break;

        case ServiceMethods.LoginService.authenticate:
          let userLoginDto:UserLoginDto = getActionPayload<BackendCallSucceededActionPayload<UserLoginDto>>(action).result;
          newStore = {
            user: userLoginDto,
            tenantId: store.tenantId,
            tenants: store.tenants,
            permissions: store.permissions,
            userPreferences: store.userPreferences
          };
          break;

        case ServiceMethods.LoginService.getLoggedInUser:
          let currentUser:UserLoginDto = getActionPayload<BackendCallSucceededActionPayload<UserLoginDto>>(action).result;
          newStore = {
            user: currentUser,
            tenantId: store.tenantId,
            tenants: store.tenants,
            permissions: store.permissions,
            userPreferences: store.userPreferences
          };
          break;

        case ServiceMethods.LoginService.switchTenant:
          let updatedUser:UserLoginDto = getActionPayload<BackendCallSucceededActionPayload<UserLoginDto>>(action).result;
          newStore = {
            user: updatedUser,
            tenantId: store.tenantId,
            tenants: store.tenants,
            permissions: store.permissions,
            userPreferences: store.userPreferences
          };
          break;

        case ServiceMethods.UserAuthorizationService.getPermissions:
          let permissions:Array<AuthPermissionDto> =
            getActionPayload <BackendCallSucceededActionPayload<Array<AuthPermissionDto>>>(action).result;
          newStore = {
            user: store.user,
            tenantId: store.tenantId,
            tenants: store.tenants,
            permissions: permissions,
            userPreferences: store.userPreferences
          };
          break;

        case ServiceMethods.LoginService.logout:
          newStore = initialUserSessionStore;
          break;

        default:
          newStore = store;
          break;
      }
      break;

    default:
      newStore = store;
      break;
  }
  return newStore;
}
