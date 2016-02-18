import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Response} from 'angular2/http';

@Injectable()
export class LoginService extends BaseService {
  constructor(http:Http) {
    super(http);

    this.servicePath = 'login';
    this.version = 'v1';
  }

  public authenticate(loginname:string, password:string, tenant:string):Observable<Response> {
    return this.newPostCall('authenticate')
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send();
  }

  public findActiveTenantsByUser(loginname:string):Observable<Response> {
    return this.newGetCall('findActiveTenantsByUser')
      .setUrlParams({
        'loginname': loginname
      })
      .send();
  }

  public getLoggedInUser():Observable<Response> {
    return this.newGetCall('getLoggedInUser')
      .send();
  }

  public hasLoggedInUser():Observable<Response> {
    return this.newGetCall('hasLoggedInUser')
      .send();
  }

  public logout():Observable<Response> {
    return this.newPostCall('logout')
      .send();
  }

  public switchTenant(tenant:string):Observable<Response> {
    return this.newPostCall('switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
