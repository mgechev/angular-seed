import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export interface IPostCall {
  setUrlParams(value:Object):IPostCall;
  setData(value:any):IPostCall;
  setFile(value:any):IPostCall;
  setUrlSubPath(value:string):IPostCall;

  send():Observable<Response>;
}
