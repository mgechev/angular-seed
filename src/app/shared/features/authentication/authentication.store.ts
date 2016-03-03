import {UserLoginDto} from '../../stubs/dtos/user-login-dto';
import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {AuthPermissionDto} from '../../stubs/dtos/auth-permission-dto';

export interface AuthenticationUserSessionStore {
  user:UserLoginDto;
  tenantId:number;
  tenants:Array<TenantLoginDto>;
  permissions:Array<AuthPermissionDto>;
  userPreferences:Object;
}
export interface AuthenticationUiStore {
  initializing:boolean;
  state:UiSessionStateEnum;
  username:string;
  password:string;
  tenant:string;
  switchToTenant:any;
  loggedIn:boolean;
}
export interface AuthenticationStore {
  userSession:AuthenticationUserSessionStore;
  ui:AuthenticationUiStore;
}

export enum UiSessionStateEnum {
  INITIAL,
  VALID_SESSION_REQUIRED,
  BACKEND_ASKED_FOR_VALID_SESSION,
  BACKEND_HAS_VALID_SESSION,
  BACKEND_HAS_NO_VALID_SESSION,
  BACKEND_VALID_SESSION_REQUESTED,
  BACKEND_VALID_SESSION_RECEIVED,
  SESSION_INVALID,
  USERNAME_ENTERED,
  BACKEND_ASKED_FOR_ACTIVE_TENANTS,
  BACKEND_ACTIVE_TENANTS_RECEIVED,
  TENANTS_LOADED,
  PASSWORD_ENTERED,
  TENANT_SELECTED,
  LOGIN_CLICKED,
  BACKEND_AUTHENTICATION_REQUESTED,
  BACKEND_LOGOUT_REQUESTED,
  SESSION_VALID,
  LOGOUT_CLICKED,
  LOGGED_OUT
  // don't forget the 'forgot password' functionality! must be handled here too
}

export const initialAuthenticationUserSessionStore:AuthenticationUserSessionStore = {
  user: null,
  tenantId: null,
  tenants: null,
  permissions: null,
  userPreferences: null
};
export const initialAuthenticationUiStore:AuthenticationUiStore = {
  initializing: true,
  state: UiSessionStateEnum.INITIAL,
  username: null,
  password: null,
  tenant: null,
  switchToTenant: null,
  loggedIn: false
};
export const initialAuthenticationStore:AuthenticationStore = {
  userSession: initialAuthenticationUserSessionStore,
  ui: initialAuthenticationUiStore
};
