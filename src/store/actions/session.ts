import {UserLoginDto} from '../../app/shared/stubs/dtos/user-login-dto';

export const AUTHENTICATE_USER:string = 'AUTHENTICATE_USER';
export const LOGOUT_USER:string = 'LOGOUT_USER';
export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';

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
