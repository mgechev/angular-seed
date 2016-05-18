import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { SkillListComponent } from './skillList.component';
import { SkillAddComponent } from './skillAdd.component';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'admin-skill',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers:[SkillService]
})

@Routes([
  { path: '/', component: SkillListComponent },
  { path: '/Add', component: SkillAddComponent },
  { path: '/Edit/:id', component: SkillAddComponent }
])
export class SkillComponent {
}