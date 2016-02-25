import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

import {queryParams} from './query-params.function';
import {IPostCall} from './post-call.interface';
import {CustomRequestOptionsArgs} from './custom-request-options-args';
import {DtoConverter} from '../../../../features/services/dto-converter.service';
import {getServerUrl} from '../base.service';
import {Store} from '../../../../../store/store';
import {backendCallStarted} from '../../../../../store/actions/services.actions';
import {backendCallSucceeded} from '../../../../../store/actions/services.actions';
import {backendCallFailed} from '../../../../../store/actions/services.actions';

export class PostCall implements IPostCall {
  private _restPath:string;

  private _requestData:any;

  private _urlSubPath:string = '';

  private _config:CustomRequestOptionsArgs;

  constructor(private http:Http, private store:Store, private methodIdent:string) {
    this._config = new CustomRequestOptionsArgs();
  }

  public setRestPath(restPath:string):IPostCall {
    this._restPath = restPath;
    return this;
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
    let self:PostCall = this;

    self.store.dispatch(backendCallStarted(self.methodIdent, null, null));
    return self.http
      .post(
        getServerUrl() + '/remote/service/' + self._restPath +
        self._urlSubPath,
        DtoConverter.dumbify(self._requestData), self._config)
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
        self.store.dispatch(backendCallSucceeded(self.methodIdent, result));

        return result;
      }, function (error:any):any {
        console.log(error);
        self.store.dispatch(backendCallFailed(self.methodIdent, error));
      });
  }
}

