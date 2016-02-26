import {BaseService} from './base/base.service';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';
import {Injectable} from 'angular2/core';
import {ServiceMethods} from './meta/service-methods';

@Injectable()
export class LoginService extends BaseService {

  constructor(http:Http, store:Store) {
    super(http, store);
  }

  public authenticate(loginname:string, password:string, tenant:string):Promise<any> {
    return this.createPostCall(ServiceMethods.LoginService.authenticate)
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send();
  }

  public findActiveTenantsByUser(loginname:string):Promise<any> {
    return this.createGetCall(ServiceMethods.LoginService.findActiveTenantsByUser)
      .setUrlParams({
        'loginname': loginname
      })
      .send();
  }

  public hasLoggedInUser():Promise<any> {
    return this.createGetCall(ServiceMethods.LoginService.hasLoggedInUser)
      .send();
  }

  public getLoggedInUser():Promise<any> {
    return this.createGetCall(ServiceMethods.LoginService.getLoggedInUser)
      .send();
  }

  public logout():Promise<any> {
    return this.createPostCall(ServiceMethods.LoginService.logout)
      .send();
  }

  public switchTenant(tenant:string):Promise<any> {
    return this.createPostCall(ServiceMethods.LoginService.switchTenant)
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
