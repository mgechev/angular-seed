import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { QualificationListComponent } from './qualificationList.component';
import { QualificationAddComponent } from './qualificationAdd.component';
import { QualificationService } from '../services/qualification.service';

@Component({
  selector: 'admin-qualification',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers:[QualificationService]
})

@Routes([
  { path: '/', component: QualificationListComponent },
  { path: '/Add', component: QualificationAddComponent },
  { path: '/Edit/:Id', component: QualificationAddComponent }
])
export class QualificationComponent {
}
