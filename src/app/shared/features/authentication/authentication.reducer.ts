import {Action} from '../../../store/actions/base.action';
import {ServiceMethods} from '../../stubs/services/meta/service-methods';
import {BACKEND_CALL_SUCCEEDED} from '../../../store/actions/services.actions';
import {BackendCallSucceededActionPayload} from '../../../store/actions/services.actions';
import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {getActionPayload} from '../../../store/actions/base.action';
import {UserLoginDto} from '../../stubs/dtos/user-login-dto';
import {AuthPermissionDto} from '../../stubs/dtos/auth-permission-dto';
import {AuthenticationUserSessionStore} from './authentication.store';
import {combineReducers,Reducer} from 'redux';
import {initialAuthenticationUserSessionStore} from './authentication.store';
import {AuthenticationUiStore} from './authentication.store';
import {initialAuthenticationUiStore} from './authentication.store';
import {AuthenticationActions} from './authentication.actions';
import {UiSessionStateEnum} from './authentication.store';
import {BACKEND_CALL_STARTED} from '../../../store/actions/services.actions';
import {BackendCallStartedActionPayload} from '../../../store/actions/services.actions';
import * as _ from 'lodash';

export const authenticationReducer:Reducer = combineReducers({
  userSession: userSessionReducer,
  ui: uiReducer
});

function userSessionReducer(store:AuthenticationUserSessionStore, action:Action<any>):AuthenticationUserSessionStore {
  if (!store) {
    return initialAuthenticationUserSessionStore;
  }

  let newStore:AuthenticationUserSessionStore;
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
          newStore = initialAuthenticationUserSessionStore;
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

function uiReducer(store:AuthenticationUiStore, action:Action<any>):AuthenticationUiStore {
  if (!store) {
    return initialAuthenticationUiStore;
  }

  let newStore:AuthenticationUiStore;
  switch (action.type) {
    case AuthenticationActions.VALID_SESSION_REQUIRED:
      newStore = _.merge({}, store, {state: UiSessionStateEnum.VALID_SESSION_REQUIRED});
      break;

    case AuthenticationActions.USER_PROVIDED_USERNAME:
      newStore = _.merge({}, store, {
        state: UiSessionStateEnum.USERNAME_ENTERED,
        username: (action as Action<string>).payload
      });
      break;

    case AuthenticationActions.USER_PROVIDED_PASSWORD:
      newStore = _.merge({}, store, {
        state: UiSessionStateEnum.PASSWORD_ENTERED,
        password: (action as Action<string>).payload
      });
      break;

    case AuthenticationActions.USER_PROVIDED_TENANT:
      newStore = _.merge({}, store, {
        state: UiSessionStateEnum.TENANT_SELECTED,
        tenant: (action as Action<string>).payload
      });
      break;

    case AuthenticationActions.USER_WANTS_TO_LOGIN:
      newStore = _.merge({}, store, {state: UiSessionStateEnum.LOGIN_CLICKED});
      break;

    case AuthenticationActions.USER_REQUESTED_TENANTSWITCH:
      newStore = _.merge({}, store, {switchToTenant: (action as Action<string>).payload});
      break;

    case AuthenticationActions.USER_WANTS_TO_LOGOUT:
      newStore = _.merge({}, store, {state: UiSessionStateEnum.LOGOUT_CLICKED});
      break;

    case BACKEND_CALL_STARTED:
      let methodIdentStarted:string = getActionPayload<BackendCallStartedActionPayload>(action).methodIdent;

      switch (methodIdentStarted) {
        case ServiceMethods.LoginService.hasLoggedInUser:
          newStore = _.merge({}, store, {state: UiSessionStateEnum.BACKEND_ASKED_FOR_VALID_SESSION});
          break;

        case ServiceMethods.LoginService.getLoggedInUser:
          newStore = _.merge({}, store, {state: UiSessionStateEnum.BACKEND_VALID_SESSION_REQUESTED});
          break;

        case ServiceMethods.LoginService.findActiveTenantsByUser:
          newStore = _.merge({}, store, {state: UiSessionStateEnum.BACKEND_ASKED_FOR_ACTIVE_TENANTS});
          break;

        case ServiceMethods.LoginService.authenticate:
          newStore = _.merge({}, store, {state: UiSessionStateEnum.BACKEND_AUTHENTICATION_REQUESTED});
          break;

        case ServiceMethods.LoginService.logout:
          newStore = _.merge({}, store, {state: UiSessionStateEnum.BACKEND_LOGOUT_REQUESTED});
          break;

        default:
          newStore = store;
          break;
      }
      break;

    case BACKEND_CALL_SUCCEEDED:

      let methodIdentSucceeded:string = getActionPayload<BackendCallSucceededActionPayload<any>>(action).methodIdent;

      switch (methodIdentSucceeded) {

        case ServiceMethods.LoginService.hasLoggedInUser:
          let hasLoggedInUser:boolean = getActionPayload<BackendCallSucceededActionPayload<boolean>>(action).result;
          if (hasLoggedInUser) {
            newStore = _.merge({}, store, {
              state: UiSessionStateEnum.BACKEND_HAS_VALID_SESSION,
              initializing: false
            });
          } else {
            newStore = _.merge({}, store, {
              state: UiSessionStateEnum.BACKEND_HAS_NO_VALID_SESSION,
              initializing: false
            });
          }
          break;

        case ServiceMethods.LoginService.getLoggedInUser:
          let currentUser:UserLoginDto =
            getActionPayload<BackendCallSucceededActionPayload<UserLoginDto>>(action).result;
          newStore = _.merge({}, store, {
            state: UiSessionStateEnum.SESSION_VALID,
            username: currentUser.loginname,
            loggedIn: true
          });
          break;

        case ServiceMethods.LoginService.findActiveTenantsByUser:
          let returnedTenants:Array<TenantLoginDto> =
            getActionPayload<BackendCallSucceededActionPayload<Array<TenantLoginDto>>>(action).result;
          let activeTenant = returnedTenants.length > 0 ? returnedTenants[0].name : store.tenant;

          if (store.loggedIn) {
            newStore = _.merge({}, store, {
              state: UiSessionStateEnum.SESSION_VALID,
              tenant: activeTenant
            });
          } else {
            newStore = _.merge({}, store, {
              state: UiSessionStateEnum.BACKEND_ACTIVE_TENANTS_RECEIVED,
              tenant: activeTenant
            });
          }

          break;

        case ServiceMethods.LoginService.authenticate:
          newStore = _.merge({}, store, {
            state: UiSessionStateEnum.SESSION_VALID,
            username: null,
            password: null,
            tenant: null,
            loggedIn: true
          });
          break;

        case ServiceMethods.LoginService.logout:
          newStore = _.merge({}, store, {loggedIn: false});
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
