import {Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import { MultipleDemoComponent} from  '../../../shared/components/MultiselectDropdown/MultipleDrodown.Component';
import { MasterData } from  '../../../shared/model/index';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CalendarDataService} from '../service/calendarDataService';
import {MyEvent, Resource} from '../model/CalendarDetails';
import { MastersService } from '../../../shared/services/masters.service';
//multiple-demo
@Component({
    moduleId: module.id,
    selector: 'schedule-interview',
    templateUrl: 'scheduleCandidateInterview.component.html',
    directives: [ROUTER_DIRECTIVES, SELECT_DIRECTIVES, FullCalendarComponent, MultipleDemoComponent],
    styleUrls: ['ScheduleCandidateInterviewComponent.css'],
})

export class ScheduleCandidateInterviewComponent implements OnInit {
    resources: Array<Resource> = new Array<Resource>();
    errorMessage: string;
    resource: Resource;
    InterviewModes: Array<MasterData>;
    InterviewTypes: Array<MasterData>;
    InterviewRounds: Array<MasterData>;
    events: any[];
    data: any;
    header: any;
    event: MyEvent;
    RRFID: string;
    dialogVisible: boolean = false;
    idGen: number = 100;
    modal: any = $('#fullCalModal');
    InterviewerMultiselect: any = $('#cmbInterviewers');

    constructor(private _router: Router,
        private _calendarDataService: CalendarDataService,
        private cd: ChangeDetectorRef,
        private _mastersService: MastersService) {
        //Initialize All Variables
        this.resource = new Resource();
        this.InterviewTypes = new Array<MasterData>();
        this.InterviewRounds = new Array<MasterData>();
        this.InterviewModes = new Array<MasterData>();
        this.resource = new Resource();
    }

    AddResources(value: any) {
        // this.resources = new Array<Resource>();
        // for (let index = 0; index <= value.val().length; index++) {
        //     this.resource = new Resource();
        //     this.resource.id = parseInt(value.val()[index]);
        //     this.resource.eventColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        //     this.resources.push(this.resource);
        //     console.log(this.resource);
        // }

    }

    ngOnInit() {
        //Get Events to show on Calendar
        this.events = this._calendarDataService.getCalendarEventData();
        //Pass Headers
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        //Get All Resources - Nominated Interviewers to show Availability
        this.resources = this._calendarDataService.getResources();
        //TODO : Get Nominated Interviewers and other Interviewwers
        this.data = this._calendarDataService.getDropDown();
        //For MultiselectDropdown
        let cmb: any = $('#cmbInterviewers');
        cmb.select2();
        cmb.change(function () {
            // let value: any = $(this);
            //TODO : Changes event on Interviewers MultiselectDropdown
        });
        //Get RRFID From Local Storage
        this.RRFID = localStorage.getItem('RRFID');
        localStorage.removeItem('RRFID');
        //TODO : Call method to get InterviewTypes & Modes
        //this.getInterviewTypes();
        //this.getInterviewModes();

    }

    handleDayClick(event: any) {
        this.event = new MyEvent();
        this.event.start = event.start.format();
        this.event.end = event.end.format();
        this.dialogVisible = true;
        $('#fullCalModal').modal();
        // trigger detection manually as somehow only moving the mouse quickly after
        // click triggers the automatic detection
        this.cd.detectChanges();
    }

    handleEventClick(e: any) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.resourceId = e.calEvent.resourceId;
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
        this.cd.detectChanges();
        $('#fullCalModal').modal();
    }

    saveEvent() {
        //update
        if (this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            //_.findIndex(this.events, { id: this.event.id });
            if (index >= 0) {
                //this.events[index] = this.event;
                this._calendarDataService.SaveEvent(index, this.event);
            }
        }
        //new
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        this.cd.detectChanges();

        $('#fullCalModal').modal('toggle');
        this.dialogVisible = false;
    }

    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
        $('#fullCalModal').modal('toggle');
        this.cd.detectChanges();

    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
    redirectToPreviousView() {
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + this.RRFID]);
    }

    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    // Get All Interview Types from Service
    getInterviewTypes() {
        this._mastersService.GetInterviewTypes()
            .subscribe(
            results => {
                this.InterviewTypes = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    // Get All Interview Rounds from Service by InterviewType
    getInterviewRoundsbyInterviewType(TypeID: number) {
        this._mastersService.GetRoundsByInterviewType(TypeID)
            .subscribe(
            results => {
                this.InterviewRounds = <any>results;
            },
            error => this.errorMessage = <any>error);

    }

    // Get All Interview Modes from Service
    getInterviewModes() {
        this._mastersService.GetInterviewModes()
            .subscribe(
            results => {
                this.InterviewTypes = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
}
