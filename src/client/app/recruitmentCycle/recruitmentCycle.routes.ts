import { Route } from '@angular/router';

import {
    RecruitmentInterviewAvailabilityComponent,
    RecruitmentInterviewScheduleComponent,
    RecruitmentInterviewerCalenderComponent} from './interviewersTab/index';
import { ScheduleInterviewsForRecruitersComponent} from './recruitersTab/index';
import { ScheduleCandidateInterviewComponent} from './scheduleInterview/index';
import { RecruitmentIEFComponent} from './shared/index';


export const RecruitmentCycleRoutes: Route[] = [
    /**Interviewers Tab */
    { path: '/', component: RecruitmentInterviewAvailabilityComponent },
    { path: '/availability', component: RecruitmentInterviewAvailabilityComponent },
    { path: '/schedule', component: RecruitmentInterviewScheduleComponent },
    { path: '/ief', component: RecruitmentIEFComponent },
    { path: '/mycalendar', component: RecruitmentInterviewerCalenderComponent },

    /**Recruiters Tab */
    { path: '/', component: ScheduleInterviewsForRecruitersComponent },

    /** Schedule Interviews Tab*/
    { path: '/:id', component: ScheduleCandidateInterviewComponent },
];
