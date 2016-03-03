import {UserLoginDto} from '../../stubs/dtos/user-login-dto';
import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {AuthPermissionDto} from '../../stubs/dtos/auth-permission-dto';

export interface UserSessionStore {
  user:UserLoginDto;
  tenantId:number;
  tenants:Array<TenantLoginDto>;
  permissions:Array<AuthPermissionDto>;
  userPreferences:Object;
}
export interface AuthenticationStore {
  userSession:UserSessionStore;
}

export const initialUserSessionStore:UserSessionStore = {
  user: null,
  tenantId: null,
  tenants: null,
  permissions: null,
  userPreferences: null
};
export const initialAuthenticationStore:AuthenticationStore = {
  userSession: initialUserSessionStore
};
