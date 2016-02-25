import {IBaseAction} from './base.action';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../shared/stubs/dtos/user-login-dto';
import {AuthPermissionDto} from '../../shared/stubs/dtos/auth-permission-dto';

export const VALID_SESSION_REQUIRED:string = 'VALID_SESSION_REQUIRED';
export const VALID_SESSION_EXISTS_NOT:string = 'VALID_SESSION_EXISTS_NOT';

export const USER_PROVIDED_USERNAME:string = 'USER_PROVIDED_USERNAME';
export const USER_PROVIDED_PASSWORD:string = 'USER_PROVIDED_PASSWORD';
export const USER_PROVIDED_TENANT:string = 'USER_PROVIDED_TENANT';

export const AUTHENTICATE_USER:string = 'AUTHENTICATE_USER';

export const USER_LOGOUT_REQUEST:string = 'USER_LOGOUT_REQUEST';
export const USER_LOGGED_OUT:string = 'USER_LOGGED_OUT';

export interface IUsernameProvidedAction extends IBaseAction {
  username:string;
}
export interface IPasswordProvidedAction extends IBaseAction {
  password:string;
}
export interface ITenantProvidedAction extends IBaseAction {
  tenant:string;
}

export const ACTIVE_TENANTS_OF_USER_LOADED:string = 'ACTIVE_TENANTS_OF_USER_LOADED';
export interface IActiveTenantsOfUserLoadedAction extends IBaseAction {
  tenants:Array<TenantLoginDto>;
}
export const USER_WANTS_TO_LOGIN:string = 'USER_WANTS_TO_LOGIN';

export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';
export interface IUserIsAuthenticatedAction extends IBaseAction {
  loggedInUser:UserLoginDto;
}
export const USERS_PERMISSIONS_LOADED:string = 'USERS_PERMISSIONS_LOADED';
export interface IUsersPermissionsLoadedAction extends IBaseAction {
  permissions:Array<AuthPermissionDto>;
}

export function validSessionRequired():IBaseAction {
  return {
    type: VALID_SESSION_REQUIRED
  };
}

export function validSessionExistsNot():IBaseAction {
  return {
    type: VALID_SESSION_EXISTS_NOT
  };
}

export function userProvidedUsername(username:string):IUsernameProvidedAction {
  return {
    type: USER_PROVIDED_USERNAME,
    username
  };
}

export function userProvidedPassword(password:string):IPasswordProvidedAction {
  return {
    type: USER_PROVIDED_PASSWORD,
    password
  };
}

export function userProvidedTenant(tenant:TenantLoginDto):ITenantProvidedAction {
  return {
    type: USER_PROVIDED_TENANT,
    tenant: tenant.name
  };
}

export function activeTenantsOfUserLoaded(tenants:Array<TenantLoginDto>):IActiveTenantsOfUserLoadedAction {
  return {
    type: ACTIVE_TENANTS_OF_USER_LOADED,
    tenants
  };
}
export function userWantsToLogin():IBaseAction {
  return {
    type: USER_WANTS_TO_LOGIN
  };
}

export function authenticateUser(username:string, password:string, tenant:string):Object {
  return {
    type: AUTHENTICATE_USER,
    username,
    password,
    tenant
  };
}

export function userLoggedOut():IBaseAction {
  return {
    type: USER_LOGGED_OUT
  };
}

export function userLogoutRequest():IBaseAction {
  return {
    type: USER_LOGOUT_REQUEST
  };
}

export function userIsAuthenticated(loggedInUser:UserLoginDto):IUserIsAuthenticatedAction {
  return {
    type: USER_IS_AUTHENTICATED,
    loggedInUser
  };
}

export function usersPermissionsLoaded(permissions:Array<AuthPermissionDto>):IUsersPermissionsLoadedAction {
  return {
    type: USERS_PERMISSIONS_LOADED,
    permissions
  };
}
