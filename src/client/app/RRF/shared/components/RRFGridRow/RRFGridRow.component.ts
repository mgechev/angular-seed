import { Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { RRFAssignStatus} from  '../../../../shared/constantValue/index';
import {IfAuthorizeDirective} from '../../../../shared/directives/ifAuthorize.directive';
//import { PanelsAvailablityComponent } from '../interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'RRFGridRow',
    templateUrl: 'RRFGridRow.component.html',
    directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../css/RRF.component.css']
})

export class RRFGridRowComponent {
    @Input() RRFData: RRFDetails = new RRFDetails();
    @Input() displayApproval: boolean = false;
    @Input() displayAssignedTo: boolean = false;
    @Input() displayJobDescDetails: boolean = false;
    @Input() displayFeedBackStatus: boolean = false;

    AssignStatus: RRFAssignStatus = RRFAssignStatus;

    getPriorityClass(priority: string): string {
        return 'priority' + priority;
    }

    getStatusClass(statusID: number): string {
        return 'status' + statusID;
    }


}
