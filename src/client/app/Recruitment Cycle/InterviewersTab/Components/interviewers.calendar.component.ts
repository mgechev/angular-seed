import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import {Interview} from '../../Shared/model/Interview';
import {InterviewersCalendarService} from '../services/interviewers.calendar.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import { Resource} from '../../ScheduleInterview/model/CalendarDetails';

@Component({
    moduleId: module.id,
    selector: 'interviewers-mycalendar',
    templateUrl: 'interviewers.calendar.component.html',
    directives: [ROUTER_DIRECTIVES, FullCalendarComponent],
    providers: [Interview, ToastsManager, InterviewersCalendarService]
})

/** RecruitmentInterviewerCalenderComponent implements OnActivate*/
export class RecruitmentInterviewerCalenderComponent implements OnActivate {
    returnPath: string;
    Title: string;
    errorMessage: string;
    InterviewAvailabilityInformation: Array<Interview> = new Array<Interview>();
    events: any[];
    header: any;
    resources: Array<Resource> = new Array<Resource>();

    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _interviewService: InterviewersCalendarService) {
    }
    routerOnActivate() {
        //Get Events to show on Calendar
        this.events = this._interviewService.getCalendarEventData();
        this.resources = this._interviewService.getResources();
        //Pass Headers
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.getMyInterviews();
        this.returnPath = sessionStorage.getItem('returnPath');
    }
    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }
    /**Get Interviewers(Current Logged in user) availability and booked slot information to display in calendar */
    getMyInterviews() {
        /**Get Interviewers availability and booked slot information to display in calendar */
        this._interviewService.getMyAvailability()
            .subscribe(
            (results: any) => {
                this.InterviewAvailabilityInformation = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    /** send current users selected slot information to the service */
    getAddSlots() {
        /** send current users selected slot information to the service */
    }
}
