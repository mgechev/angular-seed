import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class UserAuthorizationService extends BaseService {
  constructor(http:Http) {
    super(http);

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
