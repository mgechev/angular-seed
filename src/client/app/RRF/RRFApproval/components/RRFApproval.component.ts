import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {RRFApprovalListComponent} from './RRFApprovalList.component';
import { RRFApprovalService } from '../services/rrfApproval.service';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    selector: 'rrf-approval',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [RRFApprovalService ,MastersService]
})

@Routes([
    { path: '/', component: RRFApprovalListComponent },
])
export class RRFApprovalComponent {
}
