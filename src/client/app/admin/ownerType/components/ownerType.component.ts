import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { OwnerTypeListComponent } from './ownerTypeList.component';
import { OwnerTypeAddComponent } from './ownerTypeAdd.component';
import { OwnerTypeService } from '../services/ownerType.service';

@Component({
  selector: 'admin-ownerType',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers:[OwnerTypeService]
})

@Routes([
  { path: '/', component: OwnerTypeListComponent },
  { path: '/Add', component: OwnerTypeAddComponent },
  { path: '/Edit/:id', component: OwnerTypeAddComponent }
])
export class OwnerTypeComponent {
}