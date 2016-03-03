import {Action} from '../../actions/base.action';
import {ISessionStore} from '../../stores/ui/session.store';
import {initialSessionStore} from '../../stores/ui/session.store';
import {UiSessionStateEnum} from '../../stores/ui/session.store';
import {BACKEND_CALL_SUCCEEDED} from '../../actions/services.actions';
import {BackendCallSucceededActionPayload} from '../../actions/services.actions';
import {ServiceMethods} from '../../../shared/stubs/services/meta/service-methods';
import {getActionPayload} from '../../actions/base.action';
import {BACKEND_CALL_STARTED} from '../../actions/services.actions';
import {BackendCallStartedActionPayload} from '../../actions/services.actions';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../shared/stubs/dtos/user-login-dto';
import * as _ from 'lodash';
import {AuthorizationActions} from '../../../shared/features/authorization/authorization.actions';

export function sessionReducer(state:ISessionStore = initialSessionStore, action:Action<any>):ISessionStore {
  let newState:ISessionStore;

  switch (action.type) {
    case AuthorizationActions.VALID_SESSION_REQUIRED:
      newState = _.merge({}, state, {state: UiSessionStateEnum.VALID_SESSION_REQUIRED});
      break;

    case AuthorizationActions.USER_PROVIDED_USERNAME:
      newState = _.merge({}, state, {
        state: UiSessionStateEnum.USERNAME_ENTERED,
        username: (action as Action<string>).payload
      });
      break;

    case AuthorizationActions.USER_PROVIDED_PASSWORD:
      newState = _.merge({}, state, {
        state: UiSessionStateEnum.PASSWORD_ENTERED,
        password: (action as Action<string>).payload
      });
      break;

    case AuthorizationActions.USER_PROVIDED_TENANT:
      newState = _.merge({}, state, {
        state: UiSessionStateEnum.TENANT_SELECTED,
        tenant: (action as Action<string>).payload
      });
      break;

    case AuthorizationActions.USER_WANTS_TO_LOGIN:
      newState = _.merge({}, state, {state: UiSessionStateEnum.LOGIN_CLICKED});
      break;

    case AuthorizationActions.USER_REQUESTED_TENANTSWITCH:
      newState = _.merge({}, state, {switchToTenant: (action as Action<string>).payload});
      break;

    case AuthorizationActions.USER_WANTS_TO_LOGOUT:
      newState = _.merge({}, state, {state: UiSessionStateEnum.LOGOUT_CLICKED});
      break;

    case BACKEND_CALL_STARTED:
      let methodIdentStarted:string = getActionPayload<BackendCallStartedActionPayload>(action).methodIdent;

      switch (methodIdentStarted) {
        case ServiceMethods.LoginService.hasLoggedInUser:
          newState = _.merge({}, state, {state: UiSessionStateEnum.BACKEND_ASKED_FOR_VALID_SESSION});
          break;

        case ServiceMethods.LoginService.getLoggedInUser:
          newState = _.merge({}, state, {state: UiSessionStateEnum.BACKEND_VALID_SESSION_REQUESTED});
          break;

        case ServiceMethods.LoginService.findActiveTenantsByUser:
          newState = _.merge({}, state, {state: UiSessionStateEnum.BACKEND_ASKED_FOR_ACTIVE_TENANTS});
          break;

        case ServiceMethods.LoginService.authenticate:
          newState = _.merge({}, state, {state: UiSessionStateEnum.BACKEND_AUTHENTICATION_REQUESTED});
          break;

        case ServiceMethods.LoginService.logout:
          newState = _.merge({}, state, {state: UiSessionStateEnum.BACKEND_LOGOUT_REQUESTED});
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
            newState = _.merge({}, state, {
              state: UiSessionStateEnum.BACKEND_HAS_VALID_SESSION,
              initializing: false
            });
          } else {
            newState = _.merge({}, state, {
              state: UiSessionStateEnum.BACKEND_HAS_NO_VALID_SESSION,
              initializing: false
            });
          }
          break;

        case ServiceMethods.LoginService.getLoggedInUser:
          let currentUser:UserLoginDto =
            getActionPayload<BackendCallSucceededActionPayload<UserLoginDto>>(action).result;
          newState = _.merge({}, state, {
            state: UiSessionStateEnum.SESSION_VALID,
            username: currentUser.loginname,
            loggedIn: true
          });
          break;

        case ServiceMethods.LoginService.findActiveTenantsByUser:
          let returnedTenants:Array<TenantLoginDto> =
            getActionPayload<BackendCallSucceededActionPayload<Array<TenantLoginDto>>>(action).result;
          let activeTenant = returnedTenants.length > 0 ? returnedTenants[0].name : state.tenant;

          if (state.loggedIn) {
            newState = _.merge({}, state, {
              state: UiSessionStateEnum.SESSION_VALID,
              tenant: activeTenant
            });
          } else {
            newState = _.merge({}, state, {
              state: UiSessionStateEnum.BACKEND_ACTIVE_TENANTS_RECEIVED,
              tenant: activeTenant
            });
          }

          break;

        case ServiceMethods.LoginService.authenticate:
          newState = _.merge({}, state, {
            state: UiSessionStateEnum.SESSION_VALID,
            username: null,
            password: null,
            tenant: null,
            loggedIn: true
          });
          break;

        case ServiceMethods.LoginService.logout:
          newState = _.merge({}, state, {loggedIn: false});
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
