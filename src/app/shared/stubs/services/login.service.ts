import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class LoginService extends BaseService {
  constructor(http:Http) {
    super(http);

    this.servicePath = 'login';
    this.version = 'v1';
  }

  public authenticate(loginname:string, password:string, tenant:string):Promise<any> {
    return this.newPostCall('authenticate')
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send();
  }

  public findActiveTenantsByUser(loginname:string):Promise<any> {
    return this.newGetCall('findActiveTenantsByUser')
      .setUrlParams({
        'loginname': loginname
      })
      .send();
  }

  public getLoggedInUser():Promise<any> {
    return this.newGetCall('getLoggedInUser')
      .send();
  }

  public hasLoggedInUser():Promise<any> {
    return this.newGetCall('hasLoggedInUser')
      .send();
  }

  public logout():Promise<any> {
    return this.newPostCall('logout')
      .send();
  }

  public switchTenant(tenant:string):Promise<any> {
    return this.newPostCall('switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
