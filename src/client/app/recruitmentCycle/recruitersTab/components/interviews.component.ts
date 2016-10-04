import { Component} from '@angular/core';
//import { ScheduleInterviewsForRecruitersComponent} from './scheduleInterviews.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RecruiterScheduleInterviewService} from '../services/displayScheduleInterviews.service';

@Component({
    selector: 'schedule-interview-recruiter-component',
    template: '<router-outlet></router-outlet>',
    providers: [ToastsManager, RecruiterScheduleInterviewService],
})
/**
 *  angular 2.0
@Routes([
    { path: '/', component: ScheduleInterviewsForRecruitersComponent }
])
 */
export class ShowScheduleInterviewsComponent {
}


