import {Injectable} from 'angular2/core';
import {Store} from '../../../store/store';
import {appInitialized} from '../../../store/actions/app';

@Injectable()
export class InitializeService {

    constructor(private store:Store /* some stubs for backend calls */) {
    }

    public initialize():void {
        // call stubs of backend services for init data.
        // in response to this calls, do this...
        this.store.dispatch(appInitialized());
    }
}
