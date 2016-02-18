export const AUTHENTICATE_USER:string = 'AUTHENTICATE_USER';
export const USER_IS_AUTHENTICATED:string = 'USER_IS_AUTHENTICATED';

export function authenticateUser(username:string, password:string, tenant:string):Object {
  return {
    type: AUTHENTICATE_USER,
    username,
    password,
    tenant
  };
}
export function userIsAuthenticated():Object {
  return {
    type: USER_IS_AUTHENTICATED
  };
}
