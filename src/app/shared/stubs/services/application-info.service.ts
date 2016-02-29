import {BaseService} from './base/base.service';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';
import {Injectable} from 'angular2/core';
import {ServiceMethods} from './meta/service-methods';

@Injectable()
export class ApplicationInfoService extends BaseService {
  constructor(http:Http, store:Store) {
    super(http, store);
  }

  public getVersionInfo():Promise<any> {
    return this.createGetCall(ServiceMethods.ApplicationInfoService.getVersionInfo)
      .send();
  }
}
