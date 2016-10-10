import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import { DesignationListComponent } from './designationList.component';
import { DesignationAddComponent } from './designationAdd.component';
import { DesignationService } from '../services/designation.service';

@Component({
  selector: 'admin-designation',
  template: ' <router-outlet></router-outlet>',
  //directives: [ROUTER_DIRECTIVES],
  providers: [DesignationService]
})
/** TODO:: Add route files 
 *  Angular 2.0 
@Routes([
  { path: '/', component: DesignationListComponent },
  { path: '/Add', component: DesignationAddComponent },
  { path: '/Edit/:Id', component: DesignationAddComponent }
])
 * */
export class DesignationComponent {
}
