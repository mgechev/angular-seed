import { Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDashboardListComponent } from './RRFDashboardList.component';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { RRFAssignComponent } from './RRFAssign.component';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    selector: 'rrf-dashboard',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [RRFDashboardService, MyRRFService, MastersService]
})

@Routes([
    { path: '/', component: RRFDashboardListComponent },
    { path: '/Assign/:id', component: RRFAssignComponent }
])
export class RRFDashboardComponent {
}
