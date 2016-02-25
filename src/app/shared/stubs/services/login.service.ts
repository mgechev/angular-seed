import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';

@Injectable()
export class LoginService extends BaseService {
  constructor(http:Http, store:Store) {
    super(http, store);
  }

  public authenticate(loginname:string, password:string, tenant:string):Promise<any> {
    return this.createPostCall('LoginService.authenticate')
      .setRestPath('v1/login/authenticate')
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send();
  }

  public findActiveTenantsByUser(loginname:string):Promise<any> {
    return this.createGetCall('LoginService.findActiveTenantsByUser')
      .setRestPath('v1/login/findActiveTenantsByUser')
      .setUrlParams({
        'loginname': loginname
      })
      .send();
  }

  public hasLoggedInUser():Promise<any> {
    return this.createGetCall('LoginService.hasLoggedInUser')
      .setRestPath('v1/login/hasLoggedInUser')
      .send();
  }

  public getLoggedInUser():Promise<any> {
    return this.createGetCall('LoginService.getLoggedInUser')
      .setRestPath('v1/login/getLoggedInUser')
      .send();
  }

  public logout():Promise<any> {
    return this.createPostCall('LoginService.logout')
      .setRestPath('v1/login/logout')
      .send();
  }

  public switchTenant(tenant:string):Promise<any> {
    return this.createPostCall('LoginService.switchTenant')
      .setRestPath('v1/login/switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
