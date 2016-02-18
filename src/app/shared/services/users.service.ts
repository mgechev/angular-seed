/**
 * Created by dellfort on 16/02/16.
 */

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';
import 'rxjs/add/operator/map';
import {backendActionFinished} from '../../../store/actions/services';

@Injectable()
export class UsersService {

  constructor(private http: Http, private store: Store) {}

  fetchUsers() {
    console.log('in fetch users');
    let endpoint = '/mocks/users.json';
    this.http.get(endpoint).map(response => response.json()).subscribe(data => {
      this.store.dispatch(backendActionFinished(endpoint,data));
    }, error => console.log('Could not load users.'+ error));
  }
}
