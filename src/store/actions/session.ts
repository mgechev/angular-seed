import {UserLoginDto} from '../../app/shared/stubs/dtos/user-login-dto';

export const USER_WANTS_TO_LOGIN:string = 'USER_WANTS_TO_LOGIN';
export const AUTHENTICATE_USER:string = 'AUTHENTICATE_USER';
export const LOGOUT_USER:string = 'LOGOUT_USER';
export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';

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
