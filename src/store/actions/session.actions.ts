import {UserLoginDto} from '../../app/shared/stubs/dtos/user-login-dto';
import {TenantLoginDto} from '../../app/shared/stubs/dtos/tenant-login-dto';
import {AuthPermissionDto} from '../../app/shared/stubs/dtos/auth-permission-dto';
import {IBaseAction} from './base.action';

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
export const LOGOUT_USER:string = 'LOGOUT_USER';
export interface ILogoutUserAction extends IBaseAction {
}
export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';
export interface IUserIsAuthenticatedAction extends IBaseAction {
  loggedInUser:UserLoginDto;
}
export const USERS_PERMISSIONS_LOADED:string = 'USERS_PERMISSIONS_LOADED';
export interface IUsersPermissionsLoadedAction extends IBaseAction {
  permissions:Array<AuthPermissionDto>;
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
export function logoutUser():ILogoutUserAction {
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
