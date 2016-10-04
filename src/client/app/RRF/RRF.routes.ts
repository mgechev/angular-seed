import { Route } from '@angular/router';

import {MyRRFAddComponent} from './myRRF/index';
import {RRFApprovalListComponent} from './RRFApproval/index';
import {RRFDashboardListComponent,
    RRFAssignComponent,
    RRFCandidateListComponent,
    RRFReScheduleInterviewsComponent } from './RRFDashboard/index';

export const RRFRoutes: Route[] = [
    /**My RRF*/
    { path: '/Add', component: MyRRFAddComponent },
    { path: '/Edit/:id', component: MyRRFAddComponent },
    /**RRF Approval */
    { path: '/', component: RRFApprovalListComponent },
    /**RRF Dashboard */
    { path: '/', component: RRFDashboardListComponent },
    { path: '/Assign/:id', component: RRFAssignComponent },
    { path: '/Candidates/:id', component: RRFCandidateListComponent },
    { path: '/Interviews/:id', component: RRFReScheduleInterviewsComponent },
];
