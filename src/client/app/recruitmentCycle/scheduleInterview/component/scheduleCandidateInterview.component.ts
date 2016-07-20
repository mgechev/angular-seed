import {Component, ChangeDetectorRef } from '@angular/core';
import {Router, RouteSegment, ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
//import { MultipleDemoComponent} from  '../../../shared/components/MultiselectDropdown/MultipleDrodown.Component';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';//ResponseFromAPI
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CalendarDataService} from '../service/calendarDataService';
import {CalendarDetails, Event, Resource} from '../model/calendarDetails';
import { MastersService } from '../../../shared/services/masters.service';
import { InterviewAvailability, Interview } from '../../shared/model/interview';
import { ScheduleInterviewService} from '../service/ScheduleInterview.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import * as  _ from 'lodash';
import {InterviewersPanel, Interviewers} from '../model/scheduleInterview';


//multiple-demo
@Component({
    moduleId: module.id,
    selector: 'schedule-interview',
    templateUrl: 'scheduleCandidateInterview.component.html',
    directives: [ROUTER_DIRECTIVES, SELECT_DIRECTIVES, FullCalendarComponent, BUTTON_DIRECTIVES
        , FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass],
    styleUrls: ['ScheduleCandidateInterviewComponent.css'],
})

export class ScheduleCandidateInterviewComponent implements OnActivate {
    ScheduleInterView: Interview;
    resources: Array<Resource> = new Array<Resource>();
    errorMessage: string;
    // resource: Resource;
    InterviewModes: Array<MasterData>;
    InterviewTypes: Array<MasterData>;
    InterviewRounds: Array<MasterData>;
    NominatedInterviewers: Array<MasterData>;
    AllNominatedInterviewers: Array<InterviewersPanel>;
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
    SelectedInterviewers: Array<Interviewers>;
    TodaysDate: Date = new Date();
    isBookedSlot: boolean = false;
    isAvailableSlot: boolean = false;
    showConfirmation: boolean = false;
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
        this.AllNominatedInterviewers = new Array<InterviewersPanel>();
        this.OtherInterviewers = new Array<MasterData>();
        this.SelectedInterviewers = new Array<Interviewers>();
        this.InterviewerCalendarDetails = new CalendarDetails();
        this.getResources();
    }

    routerOnActivate(segment: RouteSegment) {
        this.ScheduleInterView.RRFID = JSON.parse(sessionStorage.getItem('RRFID'));
        this.ScheduleInterView.Candidate = JSON.parse(sessionStorage.getItem('Candidate')).Candidate;
        this.ScheduleInterView.CandidateID = JSON.parse(sessionStorage.getItem('Candidate')).CandidateID;

        //Get Nominated Interviewers and other Interviewwers
        this.getNominatedInterviewers();
        //Get  Interview Types
        this.getInterviewTypes();
        //Get  Interview Modes       
        this.getInterviewModes();
        //Get All Interviewers     
        this.getOtherInterviewers();

        this.InterviewerCalendarDetails.Resources = JSON.parse(localStorage.getItem('resources'));
        //Pass Headers
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };

        //For MultiselectDropdown
        let cmb: any = $('#cmbInterviewers');
        cmb.select2();
        //Check for New Interview Schedule or Re-schdule
        if (segment.getParam('id') !== 'New') {
            this.ScheduleInterView.InterviewID.Id = parseInt((segment.getParam('id')).split('ID')[1]);
            this.ScheduleInterView.InterviewID.Value = (segment.getParam('id')).split('ID')[0];
            this.getInterviewDetailsByID(this.ScheduleInterView.InterviewID);
        } else {
            this.clearSession('Candidate');
        }
        //Clear Session Values
        this.clearSession('RRFID');

    }

    getResources() {
        this._calendarDataService.GetResources()
            .subscribe(
            (results: any) => {
                if (results !== null) {
                    // this.setResources(results);
                    // this.InterviewerCalendarDetails.Resources = <any>results;
                    localStorage.setItem('resources', JSON.stringify(results));
                }
            },
            error => this.errorMessage = <any>error);
        // this.InterviewerCalendarDetails.Resources = this._calendarDataService.GetResources();
    }
    setResources(results: any) {
        this.InterviewerCalendarDetails.Resources = results;
    }

    redirectToPreviousView() {
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' +
            this.ScheduleInterView.RRFID.Value + 'ID' + this.ScheduleInterView.RRFID.Id]);

    }

    generateHexColors() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    //Validate Timeslot and proceed for Schedule Interview
    onScheduleInterviewClick() {
        let cmb: any = $('#cmbInterviewers');
        let value = cmb.val();
        //Get Events Data if "Show Availability"
        if (this.InterviewerCalendarDetails.Events.length === 0)
            this.ShowAvailabilityOnCalendar();
        //&& this.ScheduleInterView.InterviewerAvailability.length < value.length
        if (value !== null) {
            this.getOtherSelectedInterviewers(value);
        }

        var CheckOverlapping = this.checkAvailability();
        if (!CheckOverlapping && this.showConfirmation === true) {
            let cnfrmBox: any = $('#confirmSlot');
            cnfrmBox.modal('toggle');
        } else if (CheckOverlapping && this.isBookedSlot === false && this.isAvailableSlot === true) {
            this.toastr.success('Timeslot Valid');
            this.ScheduleCandidateInterView();
        } else if (CheckOverlapping && this.isBookedSlot === false && this.isAvailableSlot === false) {
            let cnfrmBox: any = $('#confirmSlot');
            cnfrmBox.modal('toggle');
        } else {
            this.toastr.warning('You can not schedule interview in booked slot');
        }
    }
    //Call Service to Save ScheduleInterview
    ScheduleCandidateInterView() {
        let cnfrmBox: any = $('#confirmSlot');
        cnfrmBox.modal('hide');
        this.changeStatus(this.ScheduleInterView.Status);
        this._ScheduleInterviewService.ScheduleInterviewForCandidate(this.ScheduleInterView)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);

                    this.redirectToPreviousView();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    //Get All Other selected Interviewers from multiselect Dropdown
    getOtherSelectedInterviewers(InterviewerIds: Array<string>) {
        this.ScheduleInterView.InterviewerAvailability = new Array<InterviewAvailability>();
        for (var index = 0; index < this.OtherInterviewers.length; index++) {
            let i = _.findIndex(this.OtherInterviewers, { Id: parseInt(InterviewerIds[index]) });
            //Push Interviewers In InterviewerAvailability Obj
            if (i >= 0) {
                var interviewAvailability: InterviewAvailability = new InterviewAvailability();
                interviewAvailability.Interviewer = this.OtherInterviewers[i];
                this.ScheduleInterView.InterviewerAvailability.push(interviewAvailability);
                if (this.ScheduleInterView.InterviewerAvailability.length === InterviewerIds.length)
                    break;
            }
        }
        return this.SelectedInterviewers;
    }
    //Get All Nominated Interviewers from Service
    getNominatedInterviewers() {
        this._ScheduleInterviewService.GetNominatedInterviewersByRRFID(this.ScheduleInterView.RRFID.Value)
            .subscribe(
            (results: any) => {
                this.setValueNominatedInterviewers(results);
                this.AllNominatedInterviewers = results;
            },
            error => this.errorMessage = <any>error);
        // this.NominatedInterviewers = this._ScheduleInterviewService.GetNominatedInterviewersByRRFID(this.ScheduleInterView.RRFID.Value);
    }

    setValueNominatedInterviewers(results: Array<InterviewersPanel>) {
        this.AllNominatedInterviewers = new Array<InterviewersPanel>();
        this.AllNominatedInterviewers = results;
        if (this.ScheduleInterView.Round.Id !== 0) {
            this.getNominatedInterviewersByRound(this.ScheduleInterView.Round.Id.toString());
        }
    }

    getNominatedInterviewersByRound(RoundId: string) {
        this.NominatedInterviewers = new Array<MasterData>();
        for (var index = 0; index < this.AllNominatedInterviewers.length; index++) {
            if (this.AllNominatedInterviewers[index].RoundNumber.Id === parseInt(RoundId)) {
                for (var i = 0; i < this.AllNominatedInterviewers[index].Interviewers.length; i++) {
                    this.NominatedInterviewers.push(this.AllNominatedInterviewers[index].Interviewers[i]);
                }
            }
        }
        if (this.ScheduleInterView.InterviewID.Id != null && this.ScheduleInterView.InterviewID.Id !== undefined) {
            var interviewerId: string[] = new Array();
            for (var index = 0; index < this.ScheduleInterView.InterviewerAvailability.length; index++) {
                interviewerId.push((this.ScheduleInterView.InterviewerAvailability[index].Interviewer.Id).toString());
            }

            $('#cmbInterviewers').select2('val', interviewerId);
        } else {
            let cmb: any = $('#cmbInterviewers');
            cmb.select2();
        }
    }

    //Shows Availability of Selected Nominated interviewers On Calendar 
    ShowAvailabilityOnCalendar() {

        let cmb: any = $('#cmbInterviewers');
        let value = cmb.val();
        if (value !== undefined && value !== null) {
            //get SelectedInterviewers
            this.SelectedInterviewers = this.getSelectedInterviewers(value);

            //Call API to get SelectedInterviewers Calendar Details.
            this._calendarDataService.GetInterviewerCalendarDetail(this.SelectedInterviewers)
                .subscribe(
                (results: any) => {
                    this.InterviewerCalendarDetails = <any>results;
                },
                (error: any) => { this.errorMessage = error; });
        }
    }

    //Get All Nominated selected Interviewers from multiselect Dropdown
    getSelectedInterviewers(InterviewerIds: Array<string>) {
        this.SelectedInterviewers = new Array<Interviewers>();
        for (var index = 0; index < this.NominatedInterviewers.length; index++) {
            let i = _.findIndex(this.NominatedInterviewers, { Id: parseInt(InterviewerIds[index]) });
            if (i >= 0) {
                var tmpInterviewer: Interviewers = new Interviewers();
                tmpInterviewer.InterviewerId = this.NominatedInterviewers[i];
                this.SelectedInterviewers.push(tmpInterviewer);
                //Push Interviewers In InterviewerAvailability Obj
                // var interviewAvailability: InterviewAvailability = new InterviewAvailability();
                // interviewAvailability.Interviewer = this.NominatedInterviewers[i];
                // this.ScheduleInterView.InterviewerAvailability.push(interviewAvailability);
            }
        }
        return this.SelectedInterviewers;
    }
    //Shows Tooltip on calendar
    showDetails(e: any) {
        var StartTime = e.event.start._i.split('T')[1];
        var EndTime = e.event.end._i.split('T')[1];
        let element: any = $(e.element);
        element.tooltip({
            title: 'Interviewer : ' + e.event.title +
            + ' Time From :' + StartTime + ' To ' + EndTime
        });
    }
    //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            h = '' + d.getHours(),
            m = '' + d.getMinutes(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    //Check For Valid And Invalid Slots while scheduling interview
    checkAvailability() {
        this.isAvailableSlot = this.isBookedSlot = this.showConfirmation = false;

        var Booked = this.InterviewerCalendarDetails.Resources
        [_.findIndex(this.InterviewerCalendarDetails.Resources, { title: 'Booked' })].id;
        var Available = this.InterviewerCalendarDetails.Resources
        [_.findIndex(this.InterviewerCalendarDetails.Resources, { title: 'Available' })].id;

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
                        //Check Following condition in Re-scheduling Case
                        if (this.ScheduleInterView.InterviewID.Id !== undefined &&
                            this.ScheduleInterView.InterviewID.Id !== this.InterviewerCalendarDetails.Events[index].InterviewID.Id)
                            //TODO : this.ScheduleInterView.InterviewID.Id === this.InterviewerCalendarDetails.Events[index].InterviewID.Id
                            this.isBookedSlot = true;
                        return false;
                    } else if (this.InterviewerCalendarDetails.Events[index].resourceId === Available) {
                        this.isAvailableSlot = true;
                        return true;
                    }
                } else if (InterviewersStartDt.getDate() === givenStrtDate.getDate()) {
                    if (this.InterviewerCalendarDetails.Events[index].resourceId === Booked) {
                        //Booked Time should not overlap
                        if ((InterviewersStartDt >= givenStrtDate && InterviewersStartDt >= givenendDate) ||
                            (InterviewersEndDt <= givenendDate && InterviewersEndDt <= givenStrtDate)) {
                            this.showConfirmation = true;
                            return false;
                        } else return false;
                    } else { this.showConfirmation = true; return false; }
                }
            } else return false;
        }

        return true;
    }

    //Change Status According to Interview Schedule
    changeStatus(status: string) {
        if (status !== null) {
            switch (status.toLowerCase()) {
                case '':
                    this.ScheduleInterView.Status = 'Scheduled';
                    break;
                case 'scheduled':
                    this.ScheduleInterView.Status = 'Re-Scheduled';
                    break;
                case 're-scheduled':
                    this.ScheduleInterView.Status = 'Re-Scheduled';
                    break;
            }
        }

    }

    getNominatedInterviewers_1(RoundID: string) {
        var i = _.findIndex(this.InterviewRounds, { Id: parseInt(RoundID) });
        if (i >= 0)
            this.ScheduleInterView.Round = this.InterviewRounds[i];
    }

    setSelectedMode(ModeId: string) {
        var i = _.findIndex(this.InterviewModes, { Id: parseInt(ModeId) });
        if (i >= 0)
            this.ScheduleInterView.InterviewMode = this.InterviewModes[i];
    }

    getInterviewDetailsByID(InterviewId: MasterData) {
        //Call Service GetInterviewDetailsByInterviewID
        this._ScheduleInterviewService.GetInterviewDetailsByInterviewID(InterviewId)
            .subscribe(
            (results: any) => {
                this.setInterviewValues(results);
            },
            error => this.errorMessage = <any>error);
    }

    setInterviewValues(results: Interview) {
        //get Result
        this.ScheduleInterView = results;
        //GetCandidateName TODO://fetch Candidate Name from results
        this.ScheduleInterView.Candidate = JSON.parse(sessionStorage.getItem('Candidate')).Candidate;
        //Set Value of Round By Interview Type
        if (this.ScheduleInterView.InterviewType.Id !== 0)
            this.getInterviewRoundsbyInterviewType(this.ScheduleInterView.InterviewType.Id.toString());
        //Set selected Nominated Interviewers
        if (this.ScheduleInterView.Round.Id !== 0) {
            this.getNominatedInterviewers();
            this.getNominatedInterviewersByRound(this.ScheduleInterView.Round.Id.toString());
        }
        //Change Date Format to yyyy-mm-dd
        this.ScheduleInterView.InterviewDate = this.formatDate(this.ScheduleInterView.InterviewDate);

        this.clearSession('Candidate');
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
    getInterviewRoundsbyInterviewType(TypeID: string) {
        var i = _.findIndex(this.InterviewTypes, { Id: parseInt(TypeID) });
        if (i >= 0)
            this.ScheduleInterView.InterviewType = this.InterviewTypes[i];
        //this.ScheduleInterView.InterviewType.Value 
        this._mastersService.GetRoundsByInterviewType(parseInt(TypeID))
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

    clearSession(key: string) {
        sessionStorage.removeItem(key);
    }
}

/* handleDayClick(event: any) {
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
        var i = _.findIndex(this.InterviewerCalendarDetails.Resources, { id: e.resourceId });
        if (i >= 0)
            this.event.Resource = this.InterviewerCalendarDetails.Resources[i].title;
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
    }*/