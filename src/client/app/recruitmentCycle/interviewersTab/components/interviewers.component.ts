import {Component} from '@angular/core';
import {Routes} from '@angular/router';
import {RecruitmentInterviewAvailabilityComponent} from './interviewers.availability.component';
import {RecruitmentInterviewScheduleComponent} from './interviewers.schedule.component';
import {RecruitmentInterviewerCalenderComponent} from './interviewers.calendar.component';
import {RecruitmentIEFComponent} from '../../shared/component/Candidate.IEF.component';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
//import {ScheduleInterviewsForRecruitersComponent} from '../../recruitersTab/components/scheduleInterviews.component';


@Component({
    selector: 'recruitment-interviewer',
    template: '<router-outlet></router-outlet>',
    //directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager]
})
/**
 * angular 2.0 changes
@Routes([
    { path: '/', component: RecruitmentInterviewAvailabilityComponent },
    { path: '/availability', component: RecruitmentInterviewAvailabilityComponent },
    { path: '/schedule', component: RecruitmentInterviewScheduleComponent },
    { path: '/ief', component: RecruitmentIEFComponent },
    { path: '/mycalendar', component: RecruitmentInterviewerCalenderComponent },
   // { path: '/showInterviews', component: ScheduleInterviewsForRecruitersComponent },
])
 */
export class InterviewrsComponent {
}
