import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import {TechnologyListComponent} from './technologyList.component';
import {TechnologyAddComponent} from './technologyAdd.component';
import { TechnologyService } from '../services/technology.service';

@Component({
  selector: 'admin-technology',
  template: ' <router-outlet></router-outlet>',
  //directives: [ROUTER_DIRECTIVES],
  providers: [TechnologyService]
})
/** TODO:: Add Urls to Routes file
 * Angular 2.0 changes
 * 
@Routes([
  { path: '/', component: TechnologyListComponent },
  { path: '/Add', component: TechnologyAddComponent },
  { path: '/Edit/:Id', component: TechnologyAddComponent }
])
*/
export class TechnologyComponent {
}
