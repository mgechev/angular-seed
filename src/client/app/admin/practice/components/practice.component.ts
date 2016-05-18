import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {PraciceListComponent} from './practiceList.component';
import {PracticeAddComponent} from './practiceAdd.component';
import { PracticeService } from '../services/practice.service';

@Component({
  selector: 'admin-practice',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
    providers:[PracticeService]
})

@Routes([
  { path: '/', component: PraciceListComponent },
  { path: '/Add', component: PracticeAddComponent },
  { path: '/Edit/:id', component: PracticeAddComponent }
])
export class PracticeComponent {
}
