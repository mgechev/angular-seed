import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';

@Injectable()
export class LoginService extends BaseService {
  constructor(http:Http, store:Store) {
    super(http, store);

    this.servicePath = 'login';
    this.version = 'v1';
  }

  public authenticate(loginname:string, password:string, tenant:string):Promise<any> {
    var self:LoginService = this;
    return self.newPostCall('authenticate')
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send();
  }

  public findActiveTenantsByUser(loginname:string):Promise<any> {
    var self:LoginService = this;
    return self.newGetCall('findActiveTenantsByUser')
      .setUrlParams({
        'loginname': loginname
      })
      .send();
  }

  public hasLoggedInUser():Promise<any> {
    var self:LoginService = this;
    return self.newGetCall('hasLoggedInUser')
      .send();
  }

  public getLoggedInUser():Promise<any> {
    var self:LoginService = this;
    return self.newGetCall('getLoggedInUser')
      .send();
  }

  public logout():Promise<any> {
    var self:LoginService = this;
    return self.newPostCall('logout')
      .send();
  }

  public switchTenant(tenant:string):Promise<any> {
    var self:LoginService = this;
    return self.newPostCall('switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
