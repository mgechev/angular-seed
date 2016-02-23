import {IBaseAction} from './base.action';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../shared/stubs/dtos/user-login-dto';
import {AuthPermissionDto} from '../../shared/stubs/dtos/auth-permission-dto';

export const LOGGEDIN_USER_REQUIRED:string = 'LOGGEDIN_USER_REQUIRED';
export const BACKEND_USER_INQUIRY_INITIALIZED:string = 'BACKEND_USER_INQUIRY_INITIALIZED';
export const SESSION_USER_EXISTS:string = 'SESSION_USER_EXISTS';
export const BACKEND_AUTHENTICATION_INITIALIZED:string = 'BACKEND_AUTHENTICATION_INITIALIZED';
export const USER_PROVIDED_USERNAME:string = 'USER_PROVIDED_USERNAME';
export const BACKEND_PROVIDED_USERNAME:string = 'USER_PROVIDED_USERNAME';

export const AUTHENTICATE_USER:string = 'AUTHENTICATE_USER';
export const LOGOUT_USER:string = 'LOGOUT_USER';

export interface IUsernameProvidedAction extends IBaseAction {
  username:string;
}

export const ACTIVE_TENANTS_OF_USER_LOADED:string = 'ACTIVE_TENANTS_OF_USER_LOADED';
export interface IActiveTenantsOfUserLoadedAction extends IBaseAction {
  tenants:Array<TenantLoginDto>;
}
export const USER_WANTS_TO_LOGIN:string = 'USER_WANTS_TO_LOGIN';
export interface IUserWantsToLoginAction extends IBaseAction {
  username:string;
  password:string;
  tenant:string;
}

export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';
export interface IUserIsAuthenticatedAction extends IBaseAction {
  loggedInUser:UserLoginDto;
}
export const USERS_PERMISSIONS_LOADED:string = 'USERS_PERMISSIONS_LOADED';
export interface IUsersPermissionsLoadedAction extends IBaseAction {
  permissions:Array<AuthPermissionDto>;
}

export function backendUserInquiryInitialized():IBaseAction {
  return {
    type: BACKEND_USER_INQUIRY_INITIALIZED
  };
}

export function loggedInUserRequired():IBaseAction {
  return {
    type: LOGGEDIN_USER_REQUIRED
  };
}

export function sessionUserExists():IBaseAction {
  return {
    type: SESSION_USER_EXISTS
  };
}

export function backendProvidedUsername(username:string):IUsernameProvidedAction {
  return {
    type: USER_PROVIDED_USERNAME,
    username
  };
}

export function userProvidedUsername(username:string):IUsernameProvidedAction {
  console.log('in userProvidedUsername action');
  return {
    type: USER_PROVIDED_USERNAME,
    username
  };
}

export function activeTenantsOfUserLoaded(tenants:Array<TenantLoginDto>):IActiveTenantsOfUserLoadedAction {
  return {
    type: ACTIVE_TENANTS_OF_USER_LOADED,
    tenants
  };
}
export function userWantsToLogin(username:string, password:string, tenant:string):IUserWantsToLoginAction {
  return {
    type: USER_WANTS_TO_LOGIN,
    username,
    password,
    tenant
  };
}

export function backendAuthenticationInitialized():IBaseAction {
  return {
    type: BACKEND_AUTHENTICATION_INITIALIZED
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

export function logoutUser():IBaseAction {
  return {
    type: LOGOUT_USER
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
