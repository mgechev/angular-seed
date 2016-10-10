import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import {RoleListComponent} from './roleList.component';
import {RoleAddEditComponent} from './roleAddEdit.component';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'admin-role',
  template: ' <router-outlet></router-outlet>',
  //directives: [ROUTER_DIRECTIVES],
  providers: [RoleService]
})
/** TODO:: Add Urls to Routes file
 * Angular 2.0 changes
 * 
@Routes([
  { path: '/', component: RoleListComponent},
  { path: '/Add', component: RoleAddEditComponent },
  { path: '/Edit/:id', component: RoleAddEditComponent }
])
*/
export class RoleComponent {
}
