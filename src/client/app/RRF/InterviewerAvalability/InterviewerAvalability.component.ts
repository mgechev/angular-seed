import { Component} from '@angular/core';
import {  ROUTER_DIRECTIVES } from '@angular/router';
import { PanelsAvailablityComponent } from '../shared/components/interviewersAvailablity/panelsAvailablity.component';

@Component({
    moduleId: module.id,
    selector: 'interviewer-avai',
    templateUrl: 'InterviewerAvalability.component.html',
    directives: [ROUTER_DIRECTIVES,PanelsAvailablityComponent]
})

export class InterviewerAvalabilityComponent {
}
