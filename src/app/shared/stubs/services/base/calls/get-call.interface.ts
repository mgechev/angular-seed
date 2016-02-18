import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export interface IGetCall {
  setUrlParams(value:Object):IGetCall;
  setUrlSubPath(value:string):IGetCall;

  send():Observable<Response>;
}
