import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

import {queryParams} from './query-params.function';
import {IPostCall} from './post-call.interface';
import {CustomRequestOptionsArgs} from './custom-request-options-args';
import {DtoConverter} from '../../../../features/services/dto-converter.service';
import {getServerUrl} from '../base.service';

export class PostCall implements IPostCall {
  private _requestData:any;

  private _urlSubPath:string = '';

  private _config:CustomRequestOptionsArgs;

  constructor(private _http:Http, private _servicePath:string, private _version:string, private _methodPath:string) {
    this._config = new CustomRequestOptionsArgs();
  }

  public setUrlParams(value:Object):IPostCall {
    if (value) {
      this._requestData = queryParams(value);
      this._config.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }
    return this;
  }

  public setData(value:any):IPostCall {
    if (value) {
      this._requestData = value;
    }
    return this;
  }

  public setFile(value:any):IPostCall {
    if (value) {
      this._requestData = new FormData();
      this._requestData.append('file', value);

      this._config.headers.set('Content-Type', undefined);
    }
    return this;
  }

  public setUrlSubPath(value:string):IPostCall {
    if (value) {
      this._urlSubPath = '/' + value;
    }
    return this;
  }

  public send():Promise<any> {
    return this._http
      .post(
        getServerUrl() + '/remote/service/' + this._version + '/' + this._servicePath + '/' + this._methodPath +
        this._urlSubPath,
        DtoConverter.dumbify(this._requestData), this._config)
      .toPromise()
      .then(function (response:Response):any {

        /*
         Not every time the call returns a json which can be parsed
         the logout() for example returns an empty string.
         ToDo: Investigate all possible response formats and handle exceptions
         */

        if (response.text() === '') {
          return response.text();
        } else {
          return DtoConverter.typify(response.json());
        }

      });
  }
}

