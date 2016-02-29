import {Action} from './base.action';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';

export const VALID_SESSION_REQUIRED:string = 'VALID_SESSION_REQUIRED';

export const USER_PROVIDED_USERNAME:string = 'USER_PROVIDED_USERNAME';
export const USER_PROVIDED_PASSWORD:string = 'USER_PROVIDED_PASSWORD';
export const USER_PROVIDED_TENANT:string = 'USER_PROVIDED_TENANT';

export const USER_WANTS_TO_LOGOUT:string = 'USER_WANTS_TO_LOGOUT';

export const USER_WANTS_TO_LOGIN:string = 'USER_WANTS_TO_LOGIN';

export function validSessionRequired():Action<any> {
  return {
    type: VALID_SESSION_REQUIRED
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

export function userWantsToLogin():Action<any> {
  return {
    type: USER_WANTS_TO_LOGIN
  };
}

export function userWantsToLogout():Action<any> {
  return {
    type: USER_WANTS_TO_LOGOUT
  };
}
