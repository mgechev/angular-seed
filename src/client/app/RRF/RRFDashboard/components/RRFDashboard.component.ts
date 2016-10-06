import { Component, NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

@Component({
    selector: 'rrf-dashboard',
    template: ' <router-outlet></router-outlet>',
    //directives: [ROUTER_DIRECTIVES],
    providers: [RRFDashboardService, MyRRFService, MastersService, PanelsAvailabilityService,
        RRFCandidateListService, RRFReScheduleInterviewService, ToastsManager]
})

@NgModule({
    declarations: [RouterModule]
})
/**
 * angular 2.0 changes
@Routes([
    { path: '/', component: RRFDashboardListComponent },
    { path: '/Assign/:id', component: RRFAssignComponent },
    { path: '/Candidates/:id', component: RRFCandidateListComponent },
    { path: '/Interviews/:id', component: RRFReScheduleInterviewsComponent },
])
*/



export class RRFDashboardComponent {
}
