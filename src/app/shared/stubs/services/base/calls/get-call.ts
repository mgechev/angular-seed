import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {queryParams} from './query-params.function';
import {IGetCall} from './get-call.interface';
import {DtoConverter} from '../../../utilities/dto-converter.service';

export class GetCall implements IGetCall
{
  private _urlParams:string = '';

  private _urlSubPath:string = '';

  constructor(private _http:Http, private _servicePath:string, private _version:string, private _methodPath:string)
  {
  }

  public setUrlParams(value:Object):IGetCall
  {
    if (value)
    {
      this._urlParams = '?' + queryParams(value);
    }
    return this;
  }

  public setUrlSubPath(value:string):IGetCall
  {
    if (value)
    {
      this._urlSubPath = '/' + value;
    }
    return this;
  }

  public send():Observable<Response>
  {
    var splUrl:string = window.location.protocol + '//' + window.location.hostname + ':8080/serviceplanet';

    return this._http
      .get(
        splUrl + '/remote/service/' + this._version + '/' + this._servicePath + '/' + this._methodPath + this._urlSubPath + this._urlParams)
      .map(function (response:Response)
      {
        return DtoConverter.typify(response.json());
      });
  }
}
