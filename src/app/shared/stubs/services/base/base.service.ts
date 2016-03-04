import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

import {GetCall} from './calls/get-call';
import {PostCall} from './calls/post-call';
import {IPostCall} from './calls/post-call.interface';
import {IGetCall} from './calls/get-call.interface';
import {Store} from '../../../../store/store';

'use strict';

/**
 * Base service class contains hidden functionality for call creation.
 */
export class BaseService {

  constructor(private http:Http, private store:Store) {
    //////////
    // hack to be able to send credentials to the server (see: https://github.com/angular/angular/issues/4231)
    let _build = (<any> http)._backend._browserXHR.build;
    (<any> http)._backend._browserXHR.build = () => {
      let _xhr = _build();
      _xhr.withCredentials = true;
      return _xhr;
    };
    //
    //////////
  }

  /**
   * Creates new GetCall object which provides possible functionality for GET method calls
   *
   * @param restPath
   * @returns {IGetCall}
   */
  protected createGetCall(restPath:string):IGetCall {
    return new GetCall(this.http, this.store, restPath) as IGetCall;
  }

  /**
   * Creates new PostCall object provides possible functionality for POST method calls
   *
   * @param restPath
   * @returns {IPostCall}
   */
  protected createPostCall(restPath:string):IPostCall {
    return new PostCall(this.http, this.store, restPath) as IPostCall;
  }

  protected newDeleteCall():any {
    // TODO: add new DeleteCall
  }

  protected newPutCall():any {
    // TODO: add new PutCall
  }
}
