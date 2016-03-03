import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {Action} from '../../../store/actions/base.action';

export class AuthorizationActions {
  public static VALID_SESSION_REQUIRED:string = 'VALID_SESSION_REQUIRED';

  public static USER_PROVIDED_USERNAME:string = 'USER_PROVIDED_USERNAME';
  public static USER_PROVIDED_PASSWORD:string = 'USER_PROVIDED_PASSWORD';
  public static USER_PROVIDED_TENANT:string = 'USER_PROVIDED_TENANT';
  public static USER_REQUESTED_TENANTSWITCH:string = 'USER_REQUESTED_TENANTSWITCH';

  public static USER_WANTS_TO_LOGOUT:string = 'USER_WANTS_TO_LOGOUT';

  public static USER_WANTS_TO_LOGIN:string = 'USER_WANTS_TO_LOGIN';


  public static validSessionRequired():Action<any> {
    return {
      type: AuthorizationActions.VALID_SESSION_REQUIRED
    };
  }

  public static userProvidedUsername(username:string):Action<string> {
    return {
      type: AuthorizationActions.USER_PROVIDED_USERNAME,
      payload: username
    };
  }

  public static userProvidedPassword(password:string):Action<string> {
    return {
      type: AuthorizationActions.USER_PROVIDED_PASSWORD,
      payload: password
    };
  }

  public static userProvidedTenant(tenant:TenantLoginDto):Action<string> {
    return {
      type: AuthorizationActions.USER_PROVIDED_TENANT,
      payload: tenant.name
    };
  }

  public static userWantsToLogin():Action<any> {
    return {
      type: AuthorizationActions.USER_WANTS_TO_LOGIN
    };
  }

  public static userRequestedTenantswitch(newTenant:TenantLoginDto):Action<TenantLoginDto> {
    return {
      type: AuthorizationActions.USER_REQUESTED_TENANTSWITCH,
      payload: newTenant
    };
  }

  public static userWantsToLogout():Action<any> {
    return {
      type: AuthorizationActions.USER_WANTS_TO_LOGOUT
    };
  }
}
