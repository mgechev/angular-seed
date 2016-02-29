export class ServiceMethods {
  public static LoginService:LoginServiceMeta = {
    authenticate: 'v1/login/authenticate',
    findActiveTenantsByUser: 'v1/login/findActiveTenantsByUser',
    hasLoggedInUser: 'v1/login/hasLoggedInUser',
    getLoggedInUser: 'v1/login/getLoggedInUser',
    logout: 'v1/login/logout',
    switchTenant: 'v1/login/switchTenant'
  };
  public static UserAuthorizationService:UserAuthorizationServiceMeta = {
    getPermissions: 'v1/userauthorization/getPermissions',
    hasAuthorization: 'v1/userauthorization/hasAuthorization'
  };
}

interface LoginServiceMeta {
  authenticate:string;
  findActiveTenantsByUser:string;
  hasLoggedInUser:string;
  getLoggedInUser:string;
  logout:string;
  switchTenant:string;
}
interface UserAuthorizationServiceMeta {
  getPermissions:string;
  hasAuthorization:string;
}
