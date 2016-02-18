import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

import {GetCall} from './calls/get-call';
import {PostCall} from './calls/post-call';
import {IPostCall} from './calls/post-call.interface';
import {IGetCall} from './calls/get-call.interface';

'use strict';

export const SERVER_URL:string = window.location.protocol + '//' + window.location.hostname + ':8080/serviceplanet';
//export const SERVER_URL:string = 'http://smdb.fntgrp.com:8002/serviceplanet';

/**
 * Base service class contains hidden functionality for call creation.
 */
export class BaseService {
  protected servicePath:string;
  protected version:string;

  constructor(private _http:Http) {
    //////////
    // hack to be able to send credentials to the server (see: https://github.com/angular/angular/issues/4231)
    let _build = (<any> _http)._backend._browserXHR.build;
    (<any> _http)._backend._browserXHR.build = () => {
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
   * @param methodPath
   * @returns {IGetCall}
   */
  protected newGetCall(methodPath:string):IGetCall {
    return new GetCall(this._http, this.servicePath, this.version, methodPath) as IGetCall;
  }

  /**
   * Creates new PostCall object provides possible functionality for POST method calls
   *
   * @param methodPath
   * @returns {IPostCall}
   */
  protected newPostCall(methodPath:string):IPostCall {
    return new PostCall(this._http, this.servicePath, this.version, methodPath) as IPostCall;
  }

  protected newDeleteCall():any {
    // TODO: add new DeleteCall
  }

  protected newPutCall():any {
    // TODO: add new PutCall
  }
}
