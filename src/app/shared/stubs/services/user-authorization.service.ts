import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';

@Injectable()
export class UserAuthorizationService extends BaseService {

  public static GET_PERMISSIONS:string = 'v1/userauthorization/getPermissions';
  public static HAS_AUTHORIZATION:string = 'v1/userauthorization/hasAuthorization';

  constructor(http:Http, store:Store) {
    super(http, store);
  }

  public getPermissions():Promise<any> {
    return this.createGetCall(UserAuthorizationService.GET_PERMISSIONS)
      .send();
  }

  public hasAuthorization():Promise<any> {
    return this.createGetCall(UserAuthorizationService.HAS_AUTHORIZATION)
      .send();
  }
}
