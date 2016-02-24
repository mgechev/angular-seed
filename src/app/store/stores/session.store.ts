import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';

export interface ISessionStore {
  loggedInUserRequired:boolean;
  backendUserInquiryInitialized:boolean;
  sessionUserExists:boolean;
  backendAuthenticationInitialized:boolean;
  providedUsername:string;
  providedTenant:string;
  providedPassword:string;
  loginAttempt:ILoginAttempt;
  userAuthenticated:boolean;
  userLogoutRequest:boolean;
  tenants:Array<TenantLoginDto>;
}

interface ILoginAttempt {
  username:string;
  password:string;
  tenant:string;
}

/**
 * Holds initial state of sessionState data-node
 *
 * @type {ISessionStore}
 */
export const initialSessionStore:ISessionStore = {
  loggedInUserRequired: false,
  backendUserInquiryInitialized: false,
  sessionUserExists: false,
  backendAuthenticationInitialized: false,
  providedUsername: null,
  providedTenant: null,
  providedPassword: null,
  loginAttempt: null,
  userAuthenticated: false,
  userLogoutRequest: false,
  tenants: null
};
