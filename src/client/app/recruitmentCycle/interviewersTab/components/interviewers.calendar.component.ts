import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router} from '@angular/router';
import { Interview} from '../../shared/model/interview';
import { InterviewersCalendarService} from '../services/interviewers.calendar.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import { Resource, Event, CalendarDetails} from '../../scheduleInterview/model/calendarDetails';
import { InterviewersAvailabilityService} from '../services/interviewers.availability.service';
import { MasterData} from '../../../shared/model/common.model';
import { DetailRRF } from '../../shared/model/detailRRF';
import { InterviewSlotComponent } from '../../shared/component/InterviewSlot/Component/InterviewSlot.component';

@Component({
    moduleId: module.id,
    selector: 'interviewers-mycalendar',
    templateUrl: 'interviewers.calendar.component.html',
    directives: [ROUTER_DIRECTIVES, FullCalendarComponent, InterviewSlotComponent],
    providers: [Interview, ToastsManager, InterviewersCalendarService, InterviewersAvailabilityService]
})

/** RecruitmentInterviewerCalenderComponent implements On-Activate*/
export class RecruitmentInterviewerCalenderComponent implements OnInit, AfterViewInit {
    returnPath: string;
    Title: string;
    errorMessage: string;
    InterviewAvailabilityInformation: Array<Interview> = new Array<Interview>();
    events: any[];
    header: any;
    resources: Array<Resource> = new Array<Resource>();
    myAssignedRRF: DetailRRF[] = [];

    RRFIdTOShowSlot: MasterData = new MasterData();
    RRFCode: string;
    showSlotForRRF: boolean = false;
    //selectedRRFID: number = 0;
    AddNewSlotText: string = 'Show Slot';
    _myCalendarDetails: CalendarDetails = new CalendarDetails();
    currentDate: string;


    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _interviewService: InterviewersCalendarService,
        private _interviewAvailabilityService: InterviewersAvailabilityService) {
        // this.getListOfAssignedRRF();
        var date = new Date();
        this.currentDate = this.formatDate(date);
    }
    ngOnInit() {
        //Get Events to show on Calendar
        this._myCalendarDetails.Resources = this._interviewService.getStaticResources();
        //this.events = this._interviewService.getCalendarEventData();
        //Pass Headers
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };

        this.returnPath = sessionStorage.getItem('returnPath');
        // this.getResources();
        this.getMyInterviews();
    }
    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    getResources() {
        this._interviewService.GetResources()
            .subscribe(
            (results: any) => {
                // this.InterviewAvailabilityInformation = results;
                this._myCalendarDetails.Resources = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    /**Get Interviewers(Current Logged in user) availability and booked slot information to display in calendar */
    getMyInterviews() {
        /**Get Interviewers availability and booked slot information to display in calendar */
        this._interviewService.getMyAvailability()
            .subscribe(
            (results: any) => {
                // this.InterviewAvailabilityInformation = results;
                this._myCalendarDetails = results;
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

    getListOfAssignedRRF() {
        this._interviewAvailabilityService.getAssignedRRF()
            .subscribe(
            (results: any) => {
                this.myAssignedRRF = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    addNewSlot() {
        if (this.showSlotForRRF === false) {
            this.showSlotForRRF = true;
            this.AddNewSlotText = 'Hide Slot';
            // for (var i = 0; i < this.myAssignedRRF.length; i++) {
            //     if (this.myAssignedRRF[i].RRFID.Id == this.selectedRRFID) {
            //         this.RRFIdTOShowSlot = this.myAssignedRRF[i].RRFID;
            //         break;
            //     }
            // }
        } else {
            this.showSlotForRRF = false;
            this.AddNewSlotText = 'Show Slot';
        }

    }
    ngAfterViewInit() {
        //this.getMyInterviews();
    }
    //Shows Tooltip on calendar
    showDetails(e: any) {
        var StartTime = e.event.start._i.split('T')[1];
        var EndTime = e.event.end._i.split('T')[1];
        let element: any = $(e.element);
        element.tooltip({
            title: '' + e.event.title
        });
    }

    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

}
