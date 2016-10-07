import { Component, Input} from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { InterviewApproval } from '../InterviewApproval/model/interviewApproval';

@Component({
    moduleId: module.id,
    selector: 'interviewApp-gridRow',
    templateUrl: 'InterviewApprovalGridRow.component.html',
    //directives: [ROUTER_DIRECTIVES]
})

export class InterviewApprovalGridRowComponent {
    @Input() interviewDetails : InterviewApproval = new InterviewApproval();

}
