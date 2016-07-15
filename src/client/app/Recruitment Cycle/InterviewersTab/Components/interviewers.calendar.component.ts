import { Component, OnInit,AfterViewInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import { Interview} from '../../Shared/model/Interview';
import { InterviewersCalendarService} from '../services/interviewers.calendar.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import { Resource, Event, CalendarDetails} from '../../ScheduleInterview/model/CalendarDetails';
import { InterviewersAvailabilityService} from '../services/interviewers.availability.service';
import { MasterData} from '../../../shared/model/common.model';
import { DetailRRF } from '../../Shared/model/detailRRF';
import { InterviewSlotComponent } from '../../Shared/Component/InterviewSlot/Component/InterviewSlot.component';

@Component({
    moduleId: module.id,
    selector: 'interviewers-mycalendar',
    templateUrl: 'interviewers.calendar.component.html',
    directives: [ROUTER_DIRECTIVES, FullCalendarComponent, InterviewSlotComponent],
    providers: [Interview, ToastsManager, InterviewersCalendarService, InterviewersAvailabilityService]
})

/** RecruitmentInterviewerCalenderComponent implements OnActivate*/
export class RecruitmentInterviewerCalenderComponent implements OnActivate,OnInit,AfterViewInit {
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
    selectedRRFID: number = 0;
    AddNewSlotText: string = "Add Slot";
     _myCalendarDetails: CalendarDetails = new CalendarDetails();


    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _interviewService: InterviewersCalendarService,
        private _interviewAvailabilityService: InterviewersAvailabilityService) {
        this.getListOfAssignedRRF();
    }
    routerOnActivate() {
        //Get Events to show on Calendar
        //this.events = this._interviewService.getCalendarEventData();
        //this.resources = this._interviewService.getResources();
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
            this.AddNewSlotText = "Hide Slot"
            for (var i = 0; i < this.myAssignedRRF.length; i++) {
                if (this.myAssignedRRF[i].RRFID.Id == this.selectedRRFID) {
                    this.RRFIdTOShowSlot = this.myAssignedRRF[i].RRFID;
                    break;
                }
            }
        }
        else {
            this.showSlotForRRF = false;
            this.AddNewSlotText = "Add Slot"
        }

    }
    
    ngOnInit() {
        //this.getMyInterviews();
    }
    
    ngAfterViewInit() {
        this.getMyInterviews();
    }


}
