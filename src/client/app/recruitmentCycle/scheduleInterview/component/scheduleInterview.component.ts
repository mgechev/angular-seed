import { Component} from '@angular/core';
import { Routes } from '@angular/router';
import { ScheduleCandidateInterviewComponent} from './scheduleCandidateInterview.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CalendarDataService} from '../service/calendarDataService';
import { ScheduleInterviewService} from '../service/ScheduleInterview.service';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    selector: 'schedule-interviewer',
    template: '<router-outlet></router-outlet>',
    //directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager, CalendarDataService, MastersService, ScheduleInterviewService],

})
/**
 * angular 2.0 changes
@Routes([
    { path: '/:id', component: ScheduleCandidateInterviewComponent }
])
 */
export class ScheduleInterviewComponent {
}
