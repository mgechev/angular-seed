import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';

export interface ISessionStore {
  loginAttempt:Object;
  userAuthenticated:boolean;
  tenants:Array<TenantLoginDto>;
}

/**
 * Holds initial state of sessionState data-node
 *
 * @type {ISessionStore}
 */
export const initialSessionStore:ISessionStore = {
  loginAttempt: null,
  userAuthenticated: false,
  tenants: null
};
