import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

import {queryParams} from './query-params.function';
import {IGetCall} from './get-call.interface';
import {DtoConverter} from '../../../../features/services/dto-converter.service';
import {getServerUrl} from '../base.service';
import {Store} from '../../../../../store/store';

export class GetCall implements IGetCall {
  private _urlParams:string = '';

  private _urlSubPath:string = '';

  constructor(private http:Http, private store:Store, private servicePath:string, private version:string, private methodPath:string) {
  }

  public setUrlParams(value:Object):IGetCall {
    if (value) {
      this._urlParams = '?' + queryParams(value);
    }
    return this;
  }

  public setUrlSubPath(value:string):IGetCall {
    if (value) {
      this._urlSubPath = '/' + value;
    }
    return this;
  }

  public send():Promise<any> {
    return this.http
      .get(
        getServerUrl() + '/remote/service/' + this.version + '/' + this.servicePath + '/' + this.methodPath +
        this._urlSubPath + this._urlParams)
      .toPromise()
      .then(function (response:Response):any {

        if (response.text() === '') {
          return response.text();
        } else {
          return DtoConverter.typify(response.json());
        }
      });
  }
}
