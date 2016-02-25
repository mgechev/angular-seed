import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';

@Injectable()
export class UserAuthorizationService extends BaseService {
  constructor(http:Http, store:Store) {
    super(http, store);

    this.servicePath = 'userauthorization';
    this.version = 'v1';
  }

  public getPermissions():Promise<any> {
    return this.newGetCall('getPermissions')
      .send();
  }

  public hasAuthorization():Promise<any> {
    return this.newGetCall('hasAuthorization')
      .send();
  }
}
