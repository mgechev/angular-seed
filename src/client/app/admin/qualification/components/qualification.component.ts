import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import { QualificationListComponent } from './qualificationList.component';
import { QualificationAddComponent } from './qualificationAdd.component';
import { QualificationService } from '../services/qualification.service';

@Component({
  selector: 'admin-qualification',
  template: ' <router-outlet></router-outlet>',
  //directives: [ROUTER_DIRECTIVES],
  providers: [QualificationService]
})
/** TODO:: Add Urls to Routes file
 * Angular 2.0 changes
 * 
@Routes([
  { path: '/', component: QualificationListComponent },
  { path: '/Add', component: QualificationAddComponent },
  { path: '/Edit/:Id', component: QualificationAddComponent }
])
*/
export class QualificationComponent {
}
