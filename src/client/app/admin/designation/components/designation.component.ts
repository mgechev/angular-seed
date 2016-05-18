import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { DesignationListComponent } from './designationList.component';
import { DesignationAddComponent } from './designationAdd.component';
import { DesignationService } from '../services/designation.service';

@Component({
  selector: 'admin-designation',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers:[DesignationService]
})

@Routes([
  { path: '/', component: DesignationListComponent },
  { path: '/Add', component: DesignationAddComponent },
  { path: '/Edit/:id', component: DesignationAddComponent }
])
export class DesignationComponent {
}