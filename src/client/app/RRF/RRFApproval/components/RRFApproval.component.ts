import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import {RRFApprovalListComponent} from './RRFApprovalList.component';
import { RRFApprovalService } from '../services/rrfApproval.service';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    selector: 'rrf-approval',
    template: ' <router-outlet></router-outlet>',
    // directives: [ROUTER_DIRECTIVES],
    providers: [RRFApprovalService, MastersService]
})
/**
 * angular 2.0 changes
@Routes([
    { path: '/', component: RRFApprovalListComponent },
])
 */
export class RRFApprovalComponent {
}
