import {Action} from '../../actions/base.action';
import {VALID_SESSION_REQUIRED} from '../../actions/session.actions';
import {ISessionStore} from '../../stores/ui/session.store';
import {initialSessionStore} from '../../stores/ui/session.store';
import {UiSessionStateEnum} from '../../stores/ui/session.store';
import {USER_PROVIDED_USERNAME} from '../../actions/session.actions';
import {USER_PROVIDED_PASSWORD} from '../../actions/session.actions';
import {USER_PROVIDED_TENANT} from '../../actions/session.actions';
import {USER_WANTS_TO_LOGIN} from '../../actions/session.actions';
import {USER_WANTS_TO_LOGOUT} from '../../actions/session.actions';
import {USER_REQUESTED_TENANTSWITCH} from '../../actions/session.actions';
import {BACKEND_CALL_SUCCEEDED} from '../../actions/services.actions';
import {BackendCallSucceededActionPayload} from '../../actions/services.actions';
import {ServiceMethods} from '../../../shared/stubs/services/meta/service-methods';
import {getActionPayload} from '../../actions/base.action';
import {BACKEND_CALL_STARTED} from '../../actions/services.actions';
import {BackendCallStartedActionPayload} from '../../actions/services.actions';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../shared/stubs/dtos/user-login-dto';

export function sessionReducer(state:ISessionStore = initialSessionStore, action:Action<any>):ISessionStore {
  let newState:ISessionStore;

  switch (action.type) {
    case VALID_SESSION_REQUIRED:
      newState = {
        state: UiSessionStateEnum.VALID_SESSION_REQUIRED,
        username: null,
        password: null,
        tenant: null,
        switchToTenant: state.switchToTenant,
        loggedIn: state.loggedIn
      };
      break;

    case USER_PROVIDED_USERNAME:
      newState = {
        state: UiSessionStateEnum.USERNAME_ENTERED,
        username: (action as Action<string>).payload,
        password: state.password,
        tenant: state.tenant,
        switchToTenant: state.switchToTenant,
        loggedIn: state.loggedIn
      };
      break;

    case USER_PROVIDED_PASSWORD:
      newState = {
        state: UiSessionStateEnum.PASSWORD_ENTERED,
        username: state.username,
        password: (action as Action<string>).payload,
        tenant: state.tenant,
        switchToTenant: state.switchToTenant,
        loggedIn: state.loggedIn
      };
      break;

    case USER_PROVIDED_TENANT:
      newState = {
        state: UiSessionStateEnum.TENANT_SELECTED,
        username: state.username,
        password: state.password,
        tenant: (action as Action<string>).payload,
        switchToTenant: state.switchToTenant,
        loggedIn: state.loggedIn
      };
      break;

    case USER_WANTS_TO_LOGIN:
      newState = {
        state: UiSessionStateEnum.LOGIN_CLICKED,
        username: state.username,
        password: state.password,
        tenant: state.tenant,
        switchToTenant: state.switchToTenant,
        loggedIn: state.loggedIn
      };
      break;

    case USER_REQUESTED_TENANTSWITCH:
      newState = {
        state: state.state,
        username: state.username,
        password: state.password,
        tenant: state.tenant,
        switchToTenant: (action as Action<string>).payload,
        loggedIn: state.loggedIn
      };
      break;

    case USER_WANTS_TO_LOGOUT:
      newState = {
        state: UiSessionStateEnum.LOGOUT_CLICKED,
        username: null,
        password: null,
        tenant: null,
        switchToTenant: state.switchToTenant,
        loggedIn: state.loggedIn
      };
      break;

    case BACKEND_CALL_STARTED:
      let methodIdentStarted:string = getActionPayload<BackendCallStartedActionPayload>(action).methodIdent;

      switch (methodIdentStarted) {
        case ServiceMethods.LoginService.hasLoggedInUser:
          newState = {
            state: UiSessionStateEnum.BACKEND_ASKED_FOR_VALID_SESSION,
            username: null,
            password: null,
            tenant: null,
            switchToTenant: state.switchToTenant,
            loggedIn: state.loggedIn
          };
          break;

        case ServiceMethods.LoginService.getLoggedInUser:
          newState = {
            state: UiSessionStateEnum.BACKEND_VALID_SESSION_REQUESTED,
            username: null,
            password: null,
            tenant: null,
            switchToTenant: state.switchToTenant,
            loggedIn: state.loggedIn
          };
          break;

        case ServiceMethods.LoginService.findActiveTenantsByUser:
          newState = {
            state: UiSessionStateEnum.BACKEND_ASKED_FOR_ACTIVE_TENANTS,
            username: state.username,
            password: state.password,
            tenant: state.tenant,
            switchToTenant: state.switchToTenant,
            loggedIn: state.loggedIn
          };
          break;

        case ServiceMethods.LoginService.authenticate:
          newState = {
            state: UiSessionStateEnum.BACKEND_AUTHENTICATION_REQUESTED,
            username: state.username,
            password: state.password,
            tenant: state.tenant,
            switchToTenant: state.switchToTenant,
            loggedIn: state.loggedIn
          };
          break;

        case ServiceMethods.LoginService.logout:
          newState = {
            state: UiSessionStateEnum.BACKEND_LOGOUT_REQUESTED,
            username: state.username,
            password: state.password,
            tenant: state.tenant,
            switchToTenant: state.switchToTenant,
            loggedIn: state.loggedIn
          };
          break;

        default:
          newState = state;
          break;
      }
      break;

    case BACKEND_CALL_SUCCEEDED:

      let methodIdentSucceeded:string = getActionPayload<BackendCallSucceededActionPayload<any>>(action).methodIdent;

      switch (methodIdentSucceeded) {

        case ServiceMethods.LoginService.hasLoggedInUser:
          let hasLoggedInUser:boolean = getActionPayload<BackendCallSucceededActionPayload<boolean>>(action).result;
          if (hasLoggedInUser) {
            newState = {
              state: UiSessionStateEnum.BACKEND_HAS_VALID_SESSION,
              username: null,
              password: null,
              tenant: null,
              switchToTenant: state.switchToTenant,
              loggedIn: state.loggedIn
            };
          } else {
            newState = {
              state: UiSessionStateEnum.BACKEND_HAS_NO_VALID_SESSION,
              username: null,
              password: null,
              tenant: null,
              switchToTenant: state.switchToTenant,
              loggedIn: state.loggedIn
            };
          }
          break;

        case ServiceMethods.LoginService.getLoggedInUser:
          let currentUser:UserLoginDto =
            getActionPayload<BackendCallSucceededActionPayload<UserLoginDto>>(action).result;
          newState = {
            state: UiSessionStateEnum.SESSION_VALID,
            username: currentUser.loginname,
            password: null,
            tenant: null,
            switchToTenant: state.switchToTenant,
            loggedIn: true
          };
          break;

        case ServiceMethods.LoginService.findActiveTenantsByUser:
          let activeTenants:Array<TenantLoginDto> =
            getActionPayload<BackendCallSucceededActionPayload<Array<TenantLoginDto>>>(action).result;

          if(state.loggedIn) {
            newState = {
              state: UiSessionStateEnum.SESSION_VALID,
              username: state.username,
              password: state.password,
              tenant: activeTenants.length > 0 ? activeTenants[0].name : state.tenant,
              switchToTenant: state.switchToTenant,
              loggedIn: true
            };
          } else {
            newState = {
              state: UiSessionStateEnum.BACKEND_ACTIVE_TENANTS_RECEIVED,
              username: state.username,
              password: state.password,
              tenant: activeTenants.length > 0 ? activeTenants[0].name : state.tenant,
              switchToTenant: state.switchToTenant,
              loggedIn: state.loggedIn
            };
          }

          break;

        case ServiceMethods.LoginService.authenticate:
          newState = {
            state: UiSessionStateEnum.SESSION_VALID,
            username: null,
            password: null,
            tenant: null,
            switchToTenant: state.switchToTenant,
            loggedIn: true
          };
          break;

        case ServiceMethods.LoginService.logout:
          newState = {
            state: UiSessionStateEnum.LOGGED_OUT,
            username: null,
            password: null,
            tenant: null,
            switchToTenant: null,
            loggedIn: false
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
