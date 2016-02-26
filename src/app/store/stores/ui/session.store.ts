export interface ISessionStore {
  state:UiSessionStateEnum;
  username:string;
  password:string;
  tenant:string;
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
  SESSION_VALID,
  LOGOUT_CLICKED,
  LOGGED_OUT
  // don't forget the 'forgot password' functionality! must be handled here too
}

export const initialSessionStore:ISessionStore = {
  state: UiSessionStateEnum.INITIAL,
  username: null,
  password: null,
  tenant: null
};
