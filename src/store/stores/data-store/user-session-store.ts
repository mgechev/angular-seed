import {TenantLoginDto} from '../../../app/shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../app/shared/stubs/dtos/user-login-dto';

export interface IUserSessionStore {
  user:UserLoginDto;
  tenantId:number;
  tenants:Array<TenantLoginDto>;
  permissions:Array<any>;
  userPreferences:Object;
}

export const initialUserSessionStore:IUserSessionStore = {
  user: null,
  tenantId: null,
  tenants: null,
  permissions: null,
  userPreferences: null
};
