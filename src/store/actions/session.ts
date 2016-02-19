import {UserLoginDto} from '../../app/shared/stubs/dtos/user-login-dto';
import {TenantLoginDto} from '../../app/shared/stubs/dtos/tenant-login-dto';

export const ACTIVE_TENANTS_OF_USER_LOADED:string = 'ACTIVE_TENANTS_OF_USER_LOADED';
export const USER_WANTS_TO_LOGIN:string = 'USER_WANTS_TO_LOGIN';
export const AUTHENTICATE_USER:string = 'AUTHENTICATE_USER';
export const LOGOUT_USER:string = 'LOGOUT_USER';
export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';

export function activeTenantsOfUserLoaded(tenants:Array<TenantLoginDto>):Object {
  return {
    type: ACTIVE_TENANTS_OF_USER_LOADED,
    tenants
  };
}
export function userWantsToLogin(username:string, password:string, tenant:string):Object {
  return {
    type: USER_WANTS_TO_LOGIN,
    username,
    password,
    tenant
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
export function logoutUser():Object {
  return {
    type: LOGOUT_USER
  };
}
export function userIsAuthenticated(loggedInUser:UserLoginDto):Object {
  return {
    type: USER_IS_AUTHENTICATED,
    loggedInUser
  };
}
