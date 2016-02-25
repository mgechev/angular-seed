import {Action} from '../../actions/base.action';
import {VALID_SESSION_REQUIRED} from '../../actions/session.actions';
import {VALID_SESSION_EXISTS_NOT} from '../../actions/session.actions';
import {ISessionStore} from '../../stores/ui/session.store';
import {initialSessionStore} from '../../stores/ui/session.store';
import {UiSessionStateEnum} from '../../stores/ui/session.store';
import {USER_PROVIDED_USERNAME} from '../../actions/session.actions';
import {USER_PROVIDED_PASSWORD} from '../../actions/session.actions';
import {USER_PROVIDED_TENANT} from '../../actions/session.actions';
import {USER_WANTS_TO_LOGIN} from '../../actions/session.actions';
import {USER_IS_AUTHENTICATED} from '../../actions/session.actions';
import {USER_LOGGED_OUT} from '../../actions/session.actions';
import {USER_LOGOUT_REQUEST} from '../../actions/session.actions';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../../actions/session.actions';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';

export function sessionReducer(state:ISessionStore = initialSessionStore, action:Action<any>):ISessionStore {
  let newState:ISessionStore;

  switch (action.type) {
    case VALID_SESSION_REQUIRED:
      newState = {
        state: UiSessionStateEnum.VALID_SESSION_REQUIRED,
        username: null,
        password: null,
        tenant: null
      };
      break;

    case VALID_SESSION_EXISTS_NOT:
      newState = {
        state: UiSessionStateEnum.SESSION_INVALID,
        username: null,
        password: null,
        tenant: null
      };
      break;

    case USER_PROVIDED_USERNAME:
      newState = {
        state: UiSessionStateEnum.USERNAME_ENTERED,
        username: (action as Action<string>).payload,
        password: state.password,
        tenant: state.tenant
      };
      break;

    case ACTIVE_TENANTS_OF_USER_LOADED:
      newState = {
        state: state.state,
        username: state.username,
        password: state.password,
        tenant: action.payload.length > 0 ? action.payload[0].name : state.tenant
      };
      break;

    case USER_PROVIDED_PASSWORD:
      newState = {
        state: UiSessionStateEnum.PASSWORD_ENTERED,
        username: state.username,
        password: (action as Action<string>).payload,
        tenant: state.tenant
      };
      break;

    case USER_PROVIDED_TENANT:
      newState = {
        state: UiSessionStateEnum.TENANT_SELECTED,
        username: state.username,
        password: state.password,
        tenant: (action as Action<string>).payload
      };
      break;

    case USER_WANTS_TO_LOGIN:
      newState = {
        state: UiSessionStateEnum.LOGIN_CLICKED,
        username: state.username,
        password: state.password,
        tenant: state.tenant
      };
      break;

    case USER_IS_AUTHENTICATED:
      newState = {
        state: UiSessionStateEnum.SESSION_VALID,
        username: null,
        password: null,
        tenant: null
      };
      break;

    case USER_LOGOUT_REQUEST:
      newState = {
        state: UiSessionStateEnum.LOGOUT_CLICKED,
        username: null,
        password: null,
        tenant: null
      };
      break;

    case USER_LOGGED_OUT:
      newState = {
        state: UiSessionStateEnum.LOGGED_OUT,
        username: null,
        password: null,
        tenant: null
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}
