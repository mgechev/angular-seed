import { Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDashboardListComponent } from './RRFDashboardList.component';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { RRFAssignComponent } from './RRFAssign.component';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { MastersService } from '../../../shared/services/masters.service';
import { RRFCandidateListComponent } from './RRFCandidateList.component';
import {RRFCandidateListService} from '../services/RRFCandidatesList.service';
import { RRFReScheduleInterviewsComponent } from './RRFReScheduleInterviews.component';
import {RRFReScheduleInterviewService} from '../services/RRFReScheduleInterviews.service';
import {PanelsAvailabilityService} from '../../shared/services/panelsAvailability.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
@Component({
    selector: 'rrf-dashboard',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES],
    providers: [RRFDashboardService, MyRRFService, MastersService, PanelsAvailabilityService,
        RRFCandidateListService, RRFReScheduleInterviewService, ToastsManager]
})

@Routes([
    { path: '/', component: RRFDashboardListComponent },
    { path: '/Assign/:id', component: RRFAssignComponent },
    { path: '/Candidates/:id', component: RRFCandidateListComponent },
    { path: '/Interviews/:id', component: RRFReScheduleInterviewsComponent },
])
export class RRFDashboardComponent {
}
