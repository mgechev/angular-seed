import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';

@Injectable()
export class LoginService extends BaseService {

  /*public static AUTHENTICATE:string = 'v1/login/authenticate';
   public static FIND_ACTIVE_TENANTS_BY_USER:string = 'v1/login/findActiveTenantsByUser';
   public static HAS_LOGGED_IN_USER:string = 'v1/login/hasLoggedInUser';
   public static GET_LOGGED_IN_USER:string = 'v1/login/getLoggedInUser';
   public static LOGOUT:string = 'v1/login/logout';
   public static SWITCH_TENANT:string = 'v1/login/switchTenant';*/

  constructor(http:Http, store:Store) {
    super(http, store);
  }

  public authenticate(loginname:string, password:string, tenant:string):Promise<any> {
    return this.createPostCall('v1/login/authenticate')
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send();
  }

  public findActiveTenantsByUser(loginname:string):Promise<any> {
    return this.createGetCall('v1/login/findActiveTenantsByUser')
      .setUrlParams({
        'loginname': loginname
      })
      .send();
  }

  public hasLoggedInUser():Promise<any> {
    return this.createGetCall('v1/login/hasLoggedInUser')
      .send();
  }

  public getLoggedInUser():Promise<any> {
    return this.createGetCall('v1/login/getLoggedInUser')
      .send();
  }

  public logout():Promise<any> {
    return this.createPostCall('v1/login/logout')
      .send();
  }

  public switchTenant(tenant:string):Promise<any> {
    return this.createPostCall('v1/login/switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
