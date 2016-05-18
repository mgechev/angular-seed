import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {RoleListComponent} from './roleList.component';
import {RoleAddEditComponent} from './roleAddEdit.component';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'admin-role',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
    providers:[RoleService]
})

@Routes([
  { path: '/', component: RoleListComponent},
  { path: '/Add', component: RoleAddEditComponent },
  { path: '/Edit/:id', component: RoleAddEditComponent }
])

export class RoleComponent {
}
