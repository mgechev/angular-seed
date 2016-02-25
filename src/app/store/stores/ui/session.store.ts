export interface ISessionStore {
  state:UiSessionStateEnum;
  username:string;
  password:string;
  tenant:string;
}

export enum UiSessionStateEnum {
  INITIAL,
  VALID_SESSION_REQUIRED,
  SESSION_INVALID,
  USERNAME_ENTERED,
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
