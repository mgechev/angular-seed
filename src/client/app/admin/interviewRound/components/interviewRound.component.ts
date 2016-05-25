import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {InterviewRoundListComponent} from './interviewRoundList.component';
import {InterviewRoundAddComponent} from './interviewRoundAdd.component';
import { InterviewRoundService } from '../services/interviewRound.service';

@Component({
  selector: 'admin-interview-round',
  template: ' <router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
    providers:[InterviewRoundService]
})

@Routes([
  { path: '/', component: InterviewRoundListComponent },
  { path: '/Add', component: InterviewRoundAddComponent },
  { path: '/Edit/:Id', component: InterviewRoundAddComponent }
])
export class InterviewRoundComponent {
}
