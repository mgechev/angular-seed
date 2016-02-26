import {Action} from './base.action';
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

export const ACTIVE_TENANTS_OF_USER_LOADED:string = 'ACTIVE_TENANTS_OF_USER_LOADED';
export const USER_WANTS_TO_LOGIN:string = 'USER_WANTS_TO_LOGIN';

export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';
export const USERS_PERMISSIONS_LOADED:string = 'USERS_PERMISSIONS_LOADED';

export function validSessionRequired():Action<any> {
  return {
    type: VALID_SESSION_REQUIRED
  };
}

export function validSessionExistsNot():Action<any> {
  return {
    type: VALID_SESSION_EXISTS_NOT
  };
}

export function userProvidedUsername(username:string):Action<string> {
  return {
    type: USER_PROVIDED_USERNAME,
    payload: username
  };
}

export function userProvidedPassword(password:string):Action<string> {
  return {
    type: USER_PROVIDED_PASSWORD,
    payload: password
  };
}

export function userProvidedTenant(tenant:TenantLoginDto):Action<string> {
  return {
    type: USER_PROVIDED_TENANT,
    payload: tenant.name
  };
}

export function activeTenantsOfUserLoaded(tenants:Array<TenantLoginDto>):Action<Array<TenantLoginDto>> {
  return {
    type: ACTIVE_TENANTS_OF_USER_LOADED,
    payload: tenants
  };
}
export function userWantsToLogin():Action<any> {
  return {
    type: USER_WANTS_TO_LOGIN
  };
}

export function userLoggedOut():Action<any> {
  return {
    type: USER_LOGGED_OUT
  };
}

export function userLogoutRequest():Action<any> {
  return {
    type: USER_LOGOUT_REQUEST
  };
}

export function userIsAuthenticated(loggedInUser:UserLoginDto):Action<UserLoginDto> {
  return {
    type: USER_IS_AUTHENTICATED,
    payload: loggedInUser
  };
}

export function usersPermissionsLoaded(permissions:Array<AuthPermissionDto>):Action<Array<AuthPermissionDto>> {
  return {
    type: USERS_PERMISSIONS_LOADED,
    payload: permissions
  };
}
