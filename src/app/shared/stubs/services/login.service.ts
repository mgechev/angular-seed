import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';

@Injectable()
export class LoginService extends BaseService {
  constructor(http:Http, private store:Store) {
    super(http);

    this.servicePath = 'login';
    this.version = 'v1';
  }

  public authenticate(loginname:string, password:string, tenant:string):Promise<any> {
    var self:LoginService = this;

    //self.store.dispatch(backendActionStarted());
    return self.newPostCall('authenticate')
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send()
      /*.then(function ():void {
       self.store.dispatch(backendActionFinished('', null));
       })*/;
  }

  public findActiveTenantsByUser(loginname:string):Promise<any> {
    var self:LoginService = this;

    //self.store.dispatch(backendActionStarted());
    return self.newGetCall('findActiveTenantsByUser')
      .setUrlParams({
        'loginname': loginname
      })
      .send()
      /*.then(function ():void {
       self.store.dispatch(backendActionFinished('', null));
       })*/;
  }

  public hasLoggedInUser():Promise<any> {
    var self:LoginService = this;

    //self.store.dispatch(backendActionStarted());
    return self.newGetCall('hasLoggedInUser')
      .send()
      /*.then(function ():void {
       self.store.dispatch(backendActionFinished('', null));
       })*/;
  }

  public getLoggedInUser():Promise<any> {
    var self:LoginService = this;

    //self.store.dispatch(backendActionStarted());
    return self.newGetCall('getLoggedInUser')
      .send()
      /*.then(function ():void {
       self.store.dispatch(backendActionFinished('', null));
       })*/;
  }

  public logout():Promise<any> {
    var self:LoginService = this;

    //self.store.dispatch(backendActionStarted());
    return self.newPostCall('logout')
      .send()
      /*.then(function ():void {
       self.store.dispatch(backendActionFinished('', null));
       })*/;
  }

  public switchTenant(tenant:string):Promise<any> {
    var self:LoginService = this;

    //self.store.dispatch(backendActionStarted());
    return self.newPostCall('switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send()
      /*.then(function ():void {
       self.store.dispatch(backendActionFinished('', null));
       })*/;
  }
}
