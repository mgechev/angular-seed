import {Store} from '../../../store/store';
import {Injectable} from 'angular2/core';
import {appInitialized} from '../../../store/actions/app';

@Injectable()
export class InitializeService {

  constructor(private store:Store/* some stubs for backend calls */) {

  }

  public initialize():void {
    // do backend calls here
    this.store.dispatch(appInitialized());
  }
}
