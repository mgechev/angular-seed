import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import {PraciceListComponent} from './practiceList.component';
import {PracticeAddComponent} from './practiceAdd.component';
import { PracticeService } from '../services/practice.service';

@Component({
  selector: 'admin-practice',
  template: ' <router-outlet></router-outlet>',
  //directives: [ROUTER_DIRECTIVES],
  providers: [PracticeService]
})
/** TODO:: Add Urls to Routes file
 * Angular 2.0 changes
 * 
@Routes([
  { path: '/', component: PraciceListComponent },
  { path: '/Add', component: PracticeAddComponent },
  { path: '/Edit/:Id', component: PracticeAddComponent }
])
*/
export class PracticeComponent {
}
