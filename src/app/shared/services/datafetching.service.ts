import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';
import 'rxjs/add/operator/map';
import {backendActionFinished} from '../../../store/actions/services.actions';

@Injectable()
export class DataFetchingService {

  constructor(private http: Http, private store: Store) {}

  endpointToStoreMap = {
      'usersState': '/mocks/users.json',
      'assignmentsState':  '/mocks/usergroups-users.json'
  };

  fetch(storepath) {

    let endpoint = this.endpointToStoreMap[storepath];

    this.http.get(endpoint).map(response => response.json()).subscribe(data => {
      this.store.dispatch(backendActionFinished(endpoint,data));
    }, error => console.log('Could not load users.'+ error));

  }

}
