/**
 * Created by dellfort on 16/02/16.
 */

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Store} from '../../../store/store';
import {UsersService} from './users.service';
import 'rxjs/add/operator/map';
import {backendActionFinished} from '../../../store/actions/services';

@Injectable()
export class AssignmentsService {

  constructor(private http: Http, private store: Store, private usersService: UsersService ) {}

  fetchUsergroupsUsersRelation() {

    let users = this.store.getState().usersState.usersList;
    let usergroupsUsersRelation = this.store.getState().assignmentsState.usersList;

    if(!users || users.length === 0) {
      this.usersService.fetchUsers();
    }

    if(!usergroupsUsersRelation) {
      let endpoint = '/mocks/usergroups-users.json';
      this.http.get(endpoint).map(response => response.json()).subscribe(data => {
        this.store.dispatch(backendActionFinished(endpoint,data));
      }, error => console.log('Could not load users.'+ error));
    }

  }

}
