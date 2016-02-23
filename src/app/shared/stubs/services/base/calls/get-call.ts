import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

import {queryParams} from './query-params.function';
import {IGetCall} from './get-call.interface';
import {DtoConverter} from '../../../../services/dto-converter.service';
import {getServerUrl} from '../base.service';

export class GetCall implements IGetCall {
  private _urlParams:string = '';

  private _urlSubPath:string = '';

  constructor(private _http:Http, private _servicePath:string, private _version:string, private _methodPath:string) {
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
    return this._http
      .get(
        getServerUrl() + '/remote/service/' + this._version + '/' + this._servicePath + '/' + this._methodPath +
        this._urlSubPath + this._urlParams)
      .toPromise()
      .then(function (response:Response):any {
        return DtoConverter.typify(response.json());
      });
  }
}
