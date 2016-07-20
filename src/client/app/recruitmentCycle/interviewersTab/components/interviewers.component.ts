import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {RecruitmentInterviewAvailabilityComponent} from './interviewers.availability.component';
import {RecruitmentInterviewScheduleComponent} from './interviewers.schedule.component';
import {RecruitmentInterviewerCalenderComponent} from './interviewers.calendar.component';
import {RecruitmentIEFComponent} from '../../shared/component/Candidate.IEF.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'recruitment-interviewer',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager]
})

@Routes([
    { path: '/', component: RecruitmentInterviewAvailabilityComponent },
    { path: '/availability', component: RecruitmentInterviewAvailabilityComponent },
    { path: '/schedule', component: RecruitmentInterviewScheduleComponent },
    { path: '/ief/:id', component: RecruitmentIEFComponent },
    { path: '/mycalendar', component: RecruitmentInterviewerCalenderComponent },
])
export class InterviewrsComponent {
}
