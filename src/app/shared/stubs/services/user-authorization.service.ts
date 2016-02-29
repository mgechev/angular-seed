import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Store} from '../../../store/store';
import {Http} from 'angular2/http';
import {ServiceMethods} from './meta/service-methods';

@Injectable()
export class UserAuthorizationService extends BaseService {

  constructor(http:Http, store:Store) {
    super(http, store);
  }

  public getPermissions():Promise<any> {
    return this.createGetCall(ServiceMethods.UserAuthorizationService.getPermissions)
      .send();
  }

  public hasAuthorization():Promise<any> {
    return this.createGetCall(ServiceMethods.UserAuthorizationService.hasAuthorization)
      .send();
  }
}
