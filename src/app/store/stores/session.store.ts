import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';

export interface ISessionStore {
  loggedInUserRequired:boolean;
  backendUserInquiryInitialized:boolean;
  sessionUserExists:boolean;
  backendAuthenticationInitialized:boolean;
  providedUsername:string;
  loginAttempt:Object;
  userAuthenticated:boolean;
  userLogoutRequest:boolean;
  tenants:Array<TenantLoginDto>;
}

/**
 * Holds initial state of sessionState data-node
 *
 * @type {ISessionStore}
 */
export const initialSessionStore:ISessionStore = {
  loggedInUserRequired: false,
  backendUserInquiryInitialized: false,
  sessionUserExists:false,
  backendAuthenticationInitialized: false,
  providedUsername: null,
  loginAttempt: null,
  userAuthenticated: false,
  userLogoutRequest:false,
  tenants: null
};
