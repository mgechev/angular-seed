import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';

@Injectable()
export class UserAuthorizationService extends BaseService {
  constructor(http:Http, store:Store) {
    super(http, store);
  }

  public getPermissions():Promise<any> {
    return this.createGetCall('UserAuthorizationService.getPermissions')
      .setRestPath('v1/userauthorization/getPermissions')
      .send();
  }

  public hasAuthorization():Promise<any> {
    return this.createGetCall('UserAuthorizationService.hasAuthorization')
      .setRestPath('v1/userauthorization/hasAuthorization')
      .send();
  }
}
