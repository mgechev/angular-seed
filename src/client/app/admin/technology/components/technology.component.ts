import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {TechnologyListComponent} from './technologyList.component';
import {TechnologyAddComponent} from './technologyAdd.component';
import { TechnologyService } from '../services/technology.service';

@Component({
  selector: 'admin-technology',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
    providers:[TechnologyService]
})

@Routes([
  { path: '/', component: TechnologyListComponent },
  { path: '/Add', component: TechnologyAddComponent },
  { path: '/Edit/:Id', component: TechnologyAddComponent }
])
export class TechnologyComponent {
}
