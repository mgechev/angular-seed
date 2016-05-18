import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {FeatureListComponent} from './featureList.component';
import {FeatureAddComponent} from './featureAdd.component';
import { FeatureService } from '../services/feature.service';

@Component({
  selector: 'admin-feature',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers:[FeatureService]
})

@Routes([
  { path: '/', component: FeatureListComponent },
  { path: '/Add', component: FeatureAddComponent },
  { path: '/Edit/:id', component: FeatureAddComponent }
])
export class FeatureComponent {
}
