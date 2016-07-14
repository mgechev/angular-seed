import {Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router, ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
//import { MultipleDemoComponent} from  '../../../shared/components/MultiselectDropdown/MultipleDrodown.Component';
import { MasterData } from  '../../../shared/model/index';//ResponseFromAPI
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CalendarDataService} from '../service/calendarDataService';
import {CalendarDetails, Event, Resource} from '../model/CalendarDetails';
import { MastersService } from '../../../shared/services/masters.service';
import { Interview } from '../../Shared/Model/Interview';
import { ScheduleInterviewService} from '../service/ScheduleInterview.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//import { APIResult } from  '../../../shared/constantValue/index';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import * as  _ from 'lodash';


//multiple-demo
@Component({
    moduleId: module.id,
    selector: 'schedule-interview',
    templateUrl: 'scheduleCandidateInterview.component.html',
    directives: [ROUTER_DIRECTIVES, SELECT_DIRECTIVES, FullCalendarComponent, BUTTON_DIRECTIVES
        , FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass],
    styleUrls: ['ScheduleCandidateInterviewComponent.css'],
})

export class ScheduleCandidateInterviewComponent implements OnInit, OnActivate {
    ScheduleInterView: Interview;
    resources: Array<Resource> = new Array<Resource>();
    errorMessage: string;
    // resource: Resource;
    InterviewModes: Array<MasterData>;
    InterviewTypes: Array<MasterData>;
    InterviewRounds: Array<MasterData>;
    NominatedInterviewers: Array<MasterData>;
    OtherInterviewers: Array<MasterData>;
    InterviewerCalendarDetails: CalendarDetails;
    events: any[];
    data: any;
    header: any;
    event: Event;
    RRFID: string;
    dialogVisible: boolean = false;
    idGen: number = 100;
    value: any = [''];
    modal: any = $('#fullCalModal');
    SelectedInterviewers: Array<MasterData>;
    TodaysDate: Date = new Date();

    InterviewerMultiselect: any = $('#cmbInterviewers');

    constructor(private _router: Router,
        private _calendarDataService: CalendarDataService,
        private cd: ChangeDetectorRef,
        public toastr: ToastsManager,
        private _mastersService: MastersService,
        private _ScheduleInterviewService: ScheduleInterviewService) {
        //Initialize All Variables
        this.resources = new Array<Resource>();
        this.InterviewTypes = new Array<MasterData>();
        this.InterviewRounds = new Array<MasterData>();
        this.InterviewModes = new Array<MasterData>();
        // this.resource = new Resource();
        this.ScheduleInterView = new Interview();
        this.NominatedInterviewers = new Array<MasterData>();
        this.OtherInterviewers = new Array<MasterData>();
        this.SelectedInterviewers = new Array<MasterData>();
        this.InterviewerCalendarDetails = new CalendarDetails();
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

    routerOnActivate() {
        //Get RRFID From Local Storage
        this.ScheduleInterView.RRFID.Value = sessionStorage.getItem('RRFID');
        //Get Nominated Interviewers and other Interviewwers
        this.getNominatedInterviewers();
        //TODO : Call method to get InterviewTypes & Modes
        this.getInterviewTypes();
        this.getInterviewModes();
        this.getOtherInterviewers();
        //Get Events to show on Calendar

        this.InterviewerCalendarDetails.Resources =
            this._calendarDataService.GetInterviewerCalendarDetail(this.SelectedInterviewers).Resources;

        //Pass Headers
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        //Get All Resources - Nominated Interviewers to show Availability
        //this.resources = this._calendarDataService.getResources();

        //this.data = this._calendarDataService.getDropDown();
        //For MultiselectDropdown
        let cmb: any = $('#cmbInterviewers');
        cmb.select2();

    }

    ngOnInit() {

        // sessionStorage.removeItem('RRFID');
        // cmb.select = this.ChangeEvent();
        // let candidate = JSON.parse(sessionStorage.getItem('Candidate'));
        // this.ScheduleInterView.CandidateID = candidate.CandidateID;
        // this.ScheduleInterView.CandidateInformation.Candidate = candidate.Candidate;
        // this.ChangeEvent();
    }

    handleDayClick(event: any) {
        this.event = new Event();
        this.event.start = event.start.format();
        this.event.end = event.end.format();
        this.dialogVisible = true;
        let modalPopup: any = $('#fullCalModal');
        modalPopup.modal();
        // trigger detection manually as somehow only moving the mouse quickly after
        // click triggers the automatic detection
        this.cd.detectChanges();
    }

    handleEventClick(e: any) {
        this.event = new Event();
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
        // this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
        this.cd.detectChanges();
        let modalPopup: any = $('#fullCalModal');
        modalPopup.modal();
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
        } else {
            //new
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        this.cd.detectChanges();
        let modalPopup: any = $('#fullCalModal');
        modalPopup.modal('toggle');
        this.dialogVisible = false;
    }

    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
        let modalPopup: any = $('#fullCalModal');
        modalPopup.modal('toggle');
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
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + this.ScheduleInterView.RRFID]);
    }

    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    //Call Service to Save ScheduleInterview
    onScheduleInterviewClick() {

        if (this.checkAvailability())
            this.toastr.success('TimeSlot Valid');
        else
            this.toastr.error('TimeSlot InValid');


        // this._ScheduleInterviewService.ScheduleInterviewForCandidate(this.ScheduleInterView)
        //     .subscribe(
        //     results => {
        //         if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
        //             this.toastr.success((<ResponseFromAPI>results).Message);
        //             this.redirectToPreviousView();
        //         } else {
        //             this.toastr.error((<ResponseFromAPI>results).Message);
        //         }
        //     },
        //     error => {
        //         this.errorMessage = <any>error;
        //         this.toastr.error(<any>error);
        //     });
    }

    getNominatedInterviewers() {
        //(roundId: string)
        // this._ScheduleInterviewService.GetNominatedInterviewersByRRFID(this.ScheduleInterView.RRFID.Value,roundId)
        this._ScheduleInterviewService.GetNominatedInterviewersByRRFID(this.ScheduleInterView.RRFID.Value)
            .subscribe(
            (results: any) => {
                this.NominatedInterviewers = results[0].Interviewers;
                this.setInterviewer(results[0].Interviewers);
                this.removeDuplicateInterviewers(results[0].Interviewers);
            },
            error => this.errorMessage = <any>error);
    }

    removeDuplicateInterviewers(NominatedInterviewers: Array<MasterData>) {

        // var Array1 = ['1', '2', '3', '4', '5'];
        // var Array2 = ['4', '5'];
        // for (var i = 0; i < Array2.length; i++) {
        //     let Index = Array1.indexOf(Array2[i]);
        //     if (Index > -1) {
        //         Array1.splice(Index, 1);
        //     }
        // }
        for (var i = 0; i < NominatedInterviewers.length; i++) {
            let Index = this.OtherInterviewers.indexOf(NominatedInterviewers[i]);
            if (Index > -1) {
                this.OtherInterviewers.splice(Index, 1);
            }
        }

    }

    setInterviewer(test: any) {
        this.NominatedInterviewers = test;
    }

    ShowAvailabilityOnCalendar() {
        this.InterviewerCalendarDetails.Events =
            this._calendarDataService.GetInterviewerCalendarDetail(this.SelectedInterviewers).Events;
        let cmb: any = $('#cmbInterviewers');
        let value = cmb.val();
        if (value !== undefined && value !== null) {
            //get SelectedInterviewers
            this.SelectedInterviewers = this.getSelectedInterviewers(value);
            //Call API to get SelectedInterviewers Calendar Details.
            /* this._calendarDataService.GetInterviewerCalendarDetail(this.SelectedInterviewers)
             .subscribe(
             results => {
                 this.InterviewerCalendarDetails = <any>results;
             },
             error => this.errorMessage = <any>error);*/

            this.InterviewerCalendarDetails.Events =
                this._calendarDataService.GetInterviewerCalendarDetail(this.SelectedInterviewers).Events;
            this.resources = this._calendarDataService.getResources();
            console.log(this.SelectedInterviewers);
        }
    }

    getSelectedInterviewers(InterviewerIds: Array<string>) {
        this.SelectedInterviewers = new Array<MasterData>();
        for (var index = 0; index < this.NominatedInterviewers.length; index++) {
            let i = _.findIndex(this.NominatedInterviewers, { Id: parseInt(InterviewerIds[index]) });
            this.SelectedInterviewers.push(this.NominatedInterviewers[i]);
        }
        return this.SelectedInterviewers;
    }

    showDetails(e: any) {
        var StartTime = e.event.start._i.split('T')[1];
        var EndTime = e.event.end._i.split('T')[1];// this.formatDate(e.event.start);
        $(e.element).tooltip({ title: 'Interviewer : ' + e.event.title + 'Time From :' + StartTime + ' To ' + EndTime });
    }

    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            h = '' + d.getHours(),
            m = '' + d.getMinutes(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [h, m].join(':');
    }
    // eventMouseover: (calEvent: any, jsEvent: any, view: any) => {

    //Check For Valid And Invalid Slots
    checkAvailability() {
        var Booked = this.InterviewerCalendarDetails.Resources
        [_.findIndex(this.InterviewerCalendarDetails.Resources, { title: 'Booked' })].id;
        for (var index = 0; index < this.InterviewerCalendarDetails.Events.length; index++) {

            var InterviewersStartDt = new Date(moment(this.InterviewerCalendarDetails.Events[index].start).local());
            var givenStrtDate =
                new Date(moment(this.ScheduleInterView.InterviewDate + 'T' + this.ScheduleInterView.InterviewFromTime).local());

            var InterviewersEndDt = new Date(moment(this.InterviewerCalendarDetails.Events[index].end).local());
            var givenendDate =
                new Date(moment(this.ScheduleInterView.InterviewDate + 'T' + this.ScheduleInterView.InterviewToTime).local());

            if (givenStrtDate < givenendDate) {
                if (InterviewersStartDt <= givenStrtDate && InterviewersEndDt >= givenendDate) {
                    if (this.InterviewerCalendarDetails.Events[index].resourceId === Booked) {
                        return false;
                    }
                } else if (InterviewersStartDt.getDate() === givenStrtDate.getDate()) {
                    return false;
                }
            } else return false;

        }
        return true;
    }


    /*---------------------------- MasterData Service Methods -----------------------------*/
    // Get All Interviewers from Service
    getOtherInterviewers() {
        this._mastersService.getInterviewers()
            .subscribe(
            results => {
                this.OtherInterviewers = <any>results;
            },
            error => this.errorMessage = <any>error);
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
                this.InterviewModes = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
}
