import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

import {queryParams} from './query-params.function';
import {IGetCall} from './get-call.interface';
import {DtoConverter} from '../../../../features/services/dto-converter.service';
import {getServerUrl} from '../base.service';
import {Store} from '../../../../../store/store';
import {backendCallStarted} from '../../../../../store/actions/services.actions';
import {backendCallSucceeded} from '../../../../../store/actions/services.actions';
import {backendCallFailed} from '../../../../../store/actions/services.actions';

export class GetCall implements IGetCall {

  private _urlParams:string = '';
  private _urlSubPath:string = '';

  constructor(private http:Http, private store:Store, private restPath:string) {
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
    let self:GetCall = this;

    self.store.dispatch(backendCallStarted(self.restPath, null, null));
    return self.http
      .get(
        getServerUrl() + '/remote/service/' + self.restPath + '/' +
        self._urlSubPath + self._urlParams)
      .toPromise()
      .then(function (response:Response):any {
        let result:any;

        /*
         Not every time the call returns a json which can be parsed
         the logout() for example returns an empty string.
         ToDo: Investigate all possible response formats and handle exceptions
         */

        if (response.text() === '') {
          result = response.text();
        } else {
          result = DtoConverter.typify(response.json());
        }
        self.store.dispatch(backendCallSucceeded(self.restPath, result));

        return result;
      }, function (error:any):any {
        console.log(error);
        self.store.dispatch(backendCallFailed(self.restPath, error));
      });
  }
}
