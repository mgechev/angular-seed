import {UserLoginDto} from '../../../app/shared/stubs/dtos/user-login-dto';
import {TenantLoginDto} from '../../../app/shared/stubs/dtos/tenant-login-dto';

export class UserSessionStore {
  public user:UserLoginDto;
  public tenantId:number;
  public tenants:Array<TenantLoginDto>;
  public permissions:Array<any>;
  public userPreferences:Object;
}
