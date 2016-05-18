import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {UserListComponent} from './userList.component';
import {UserRoleComponent} from './userRole.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'admin-user',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
    providers:[UserService]
})

@Routes([
  { path: '/', component: UserListComponent },
  { path: '/Role/:id', component: UserRoleComponent }
])
export class UserComponent {
}
