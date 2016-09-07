import {Component, ChangeDetectorRef } from '@angular/core';
import {Router, RouteSegment, ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
//import { MultipleDemoComponent} from  '../../../shared/components/MultiselectDropdown/MultipleDrodown.Component';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';//ResponseFromAPI
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import {CalendarDataService} from '../service/calendarDataService';
import {CalendarDetails, Event, Resource} from '../model/calendarDetails';
import { MastersService } from '../../../shared/services/masters.service';
import { InterviewAvailability, Interview, InterviewsRounds } from '../../shared/model/interview';
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
    InterviewSkypeId: Array<MasterData>;
    InterviewRounds: Array<MasterData>;
    /**Get interview rounds with new format */
    CombinedInterviewRounds: Array<InterviewsRounds>;
    NominatedInterviewers: Array<MasterData>;
    AllNominatedInterviewers: Array<InterviewersPanel>;
    OtherInterviewers: Array<MasterData>;
    InterviewerCalendarDetails: CalendarDetails = new CalendarDetails();
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
    ifInvalidInterview: boolean = false;
    isRejectedCandidate: boolean = false;
    roundTobeScheduled: MasterData = new MasterData();
    ifInterviewScheduled: boolean = true;
    ifRescheduleInterview: boolean = false;
    selectSkypeID: boolean = false;
    isInterviewReschedule: boolean = false;
    NominatedInterviewersAvailable: boolean = false;
    currentDate: string;

    constructor(private _router: Router,
        private _calendarDataService: CalendarDataService,
        private cd: ChangeDetectorRef,
        public toastr: ToastsManager,
        private _ScheduleInterviewService: ScheduleInterviewService,
        private _mastersService: MastersService
    ) {
        //Initialize All Variables
        this.resources = new Array<Resource>();
        this.InterviewTypes = new Array<MasterData>();
        this.InterviewSkypeId = new Array<MasterData>();
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
        var date = new Date();
        this.currentDate = this.formatDate(date);
        //this.event = new Event();
    }

    routerOnActivate(segment: RouteSegment) {
        this.ScheduleInterView.RRFID = JSON.parse(sessionStorage.getItem('RRFID'));
        this.ScheduleInterView.Candidate = JSON.parse(sessionStorage.getItem('Candidate')).Candidate;
        this.ScheduleInterView.CandidateID = JSON.parse(sessionStorage.getItem('Candidate')).CandidateID;
        this.ScheduleInterView.Status = sessionStorage.getItem('Status') !== null ? sessionStorage.getItem('Status') : 'Not Scheduled';
        this.clearSession('Status');

        //this.ScheduleInterView.CandidateStatus.Value = 'Rejected';
        if (this.ScheduleInterView.Status !== null && this.ScheduleInterView.Status !== undefined &&
            this.ScheduleInterView.Status.toLowerCase() === 'rejected') {
            this.isRejectedCandidate = this.ifInvalidInterview = true;
        }

        this.getResources();
        //Get All Interviewers     
        this.getOtherInterviewers();
        //Get Nominated Interviewers and other Interviewwers
        this.getNominatedInterviewers();
        //Get  Interview Types
        this.getInterviewTypes();
        //Get  Interview Modes       
        this.getInterviewModes();
        //Get Skype Id
        this.getInterviewSkypeId();
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
            /******Get Modified Interiews */

            var _isRescheduled = this.ScheduleInterView.Status ?
                this.ScheduleInterView.Status.toLowerCase() === 'rescheduled' ? true : false
                : false;
            if (_isRescheduled) {
                //Get Modified Rounds for re-schedule
                this.getInterviewRoundsIsRescheduled(this.ScheduleInterView.CandidateID.Value
                    , this.ScheduleInterView.RRFID.Value
                    , this.ScheduleInterView.InterviewID.Id.toString());
            } else {
                //Get Modified Rounds
                this.getInterviewRounds(this.ScheduleInterView.CandidateID.Value,
                    this.ScheduleInterView.RRFID.Value);
            }
            /******END Get Modified Interiews */

            this.getInterviewDetailsByID(this.ScheduleInterView.InterviewID);
        } else {
            //Get Modified Rounds
            if (_isRescheduled || this.ScheduleInterView.Status.toLowerCase() === 'cancelled') {
                //Get Modified Rounds for re-schedule

                this.getInterviewRoundsIsRescheduled(this.ScheduleInterView.CandidateID.Value
                    , this.ScheduleInterView.RRFID.Value
                    , this.ScheduleInterView.InterviewID.Id ? this.ScheduleInterView.InterviewID.Id.toString() : '');
            } else {
                this.getInterviewRounds(this.ScheduleInterView.CandidateID.Value,
                    this.ScheduleInterView.RRFID.Value);
                this.clearSession('Candidate');
            }
        }

    }


    getResources() {
        //  this._calendarDataService.GetResources().then(
        //         (results:any) => {
        //             this.resources = results;
        //         }).catch(
        //             (error: any) => this.errorMessage = <any>error
        //         );
        this.resources = this._calendarDataService.GetResources();
    }

    redirectToPreviousView() {
        //Clear Session Values
        this.clearSession('RRFID');
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' +
            this.ScheduleInterView.RRFID.Value + 'ID' + this.ScheduleInterView.RRFID.Id]);

    }

    onScheduleInterviewClick() {
        try {
            //Check For Valid Interview if Valid ScheduleInterview
            if (!this.ifInvalidInterview) {
                //Validate Timeslot and proceed for Schedule Interview
                let cmb: any = $('#cmbInterviewers');
                let value = cmb.val();
                //Get Events Data if "Show Availability"
                // if (this.InterviewerCalendarDetails.Events === null)
                if (this.InterviewerCalendarDetails.Events === null
                    || this.InterviewerCalendarDetails.Events.length === 0)
                    this.ShowAvailabilityOnCalendar();
                //&& this.ScheduleInterView.InterviewerAvailability.length < value.length
                if (value !== null) {
                    /**Get All Other selected Interviewers from multiselect Dropdown */
                    this.getOtherSelectedInterviewers(value);
                    /**Change Status According to Interview Schedule */
                    this.changeStatus(this.ScheduleInterView.Status);
                    /**Check For Valid And Invalid Slots while scheduling interview */
                    var CheckOverlapping = this.checkAvailability();

                    if (!CheckOverlapping && this.showConfirmation === true) {
                        let cnfrmBox: any = $('#confirmSlot');
                        cnfrmBox.modal('toggle');
                    } else if (CheckOverlapping && this.isBookedSlot === false && this.isAvailableSlot === true) {
                        /**Checking in case of slot available */
                        this.toastr.success('Timeslot Valid');
                        this.ScheduleCandidateInterView();
                    } else if (CheckOverlapping && this.isBookedSlot === false && this.isAvailableSlot === false) {
                        /**Checking in case of overlaping of slots */
                        let cnfrmBox: any = $('#confirmSlot');
                        cnfrmBox.modal('toggle');
                    } else if (this.InterviewerCalendarDetails.Events === null
                        || this.InterviewerCalendarDetails.Events.length === 0) {
                        /**Checking In case of there are no Availability for interviewrs */
                        let cnfrmBox: any = $('#confirmSlot');
                        cnfrmBox.modal('toggle');
                    } else {
                        this.toastr.warning('You can not schedule interview in booked slot');
                    }
                } else { this.toastr.warning('Please fill atleast one interviewer'); }

            } else {
                //if Invalid Send for Approval

                if (this.isRejectedCandidate) {
                    this.ScheduleInterView.ApprovalType = 'Rejected Candidate';
                } else { this.ScheduleInterView.ApprovalType = 'Skip Interview'; }

                this.ScheduleInterView.Status = 'Awaiting Approval';
                //Validate Timeslot and proceed for Schedule Interview
                let cmb: any = $('#cmbInterviewers');
                let value = cmb.val();
                if (value !== null) {
                    /**Get All Other selected Interviewers from multiselect Dropdown */
                    this.getOtherSelectedInterviewers(value);
                }
                this.ScheduleCandidateInterView();
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Call Service to Save ScheduleInterview
    ScheduleCandidateInterView() {
        let cnfrmBox: any = $('#confirmSlot');
        cnfrmBox.modal('hide');

        if (this.isRejectedCandidate) {
            this.ScheduleInterView.ApprovalType = 'Rejected Candidate';
            this.ScheduleInterView.Status = 'Awaiting Approval';
        }

        if (this.ScheduleInterView.InterviewID.Id === undefined) {
            /**Schedule interview in Following cases 
             * 1- Scheduling new interview
             * 2- Scheduling interview (Only if interviewer and interview date is changed) [considering it as Re-schedule]
             */
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
        } else {
            /**Schedule interview in Following cases 
             * 1- Update interview (Only if interviewer and interview date is NOT changed) [considering it Update interview]
             */
            this._ScheduleInterviewService.UpdateScheduleInterviewForCandidate(this.ScheduleInterView)
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

    }

    /**Get All Other selected Interviewers from multiselect Dropdown */
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
        if (this.ScheduleInterView.RRFID !== undefined) {
            this._ScheduleInterviewService.GetNominatedInterviewersByRRFID(this.ScheduleInterView.RRFID.Value)
                .subscribe(
                (results: any) => {
                    if (results.length > 0) {
                        this.NominatedInterviewersAvailable = true;
                        this.setValueNominatedInterviewers(results);
                        this.AllNominatedInterviewers = results;
                    } else { this.NominatedInterviewersAvailable = false; }
                },
                error => this.errorMessage = <any>error);
        }
        // this.NominatedInterviewers = this._ScheduleInterviewService.GetNominatedInterviewersByRRFID(this.ScheduleInterView.RRFID.Value);
    }

    setValueNominatedInterviewers(results: Array<InterviewersPanel>) {
        this.AllNominatedInterviewers = new Array<InterviewersPanel>();
        this.AllNominatedInterviewers = results;
        if (this.ScheduleInterView.Round.Id !== undefined) {
            this.getNominatedInterviewersByRound(this.ScheduleInterView.Round.Id.toString());
        }
    }
    /**Bind all interviewrs id as per rounds */
    getNominatedInterviewersByRounds(RoundId: string) {
        this.NominatedInterviewers = new Array<MasterData>();
        for (var index = 0; index < this.AllNominatedInterviewers.length; index++) {
            if (this.AllNominatedInterviewers[index].RoundNumber.Id === parseInt(RoundId)) {
                for (var i = 0; i < this.AllNominatedInterviewers[index].Interviewers.length; i++) {
                    this.NominatedInterviewers.push(this.AllNominatedInterviewers[index].Interviewers[i]);
                }
            }
        }
        //set is nominated interviewrs are available for current round
        this.NominatedInterviewersAvailable = (this.NominatedInterviewers.length > 0) ? true : false;
    }

    isRoundSkipped(_interviewRound: string): boolean {
        if (this.CombinedInterviewRounds === undefined) {
            return false;
        }
        /**Find selected rounds object */
        var selectedRound = this.CombinedInterviewRounds.find(x => x.InterviewRound.Id === parseInt(_interviewRound));
        /**Find object of rounds whoes Sequence is prior (less) than selected round */
        var result = this.CombinedInterviewRounds
            .filter(y => parseFloat(y.Sequence) < parseFloat(selectedRound.Sequence))
            .some(x => x.IsPresnetInRRF);/**returns true if there is any round mention in rrf is skipp  */

        return result;
    }
    getNominatedInterviewersByRound(RoundId: string) {
        if (this.CombinedInterviewRounds) {
            /**gets null incase of rescheduled */
            var selectedRound = this.CombinedInterviewRounds.find(x => x.InterviewRound.Id === parseInt(RoundId));
            this.ScheduleInterView.InterviewType = selectedRound.InterviewType;
        }
        this.getNominatedInterviewersByRounds(RoundId);
        if (!this.isRoundSkipped(RoundId)) {
            // if (this.roundTobeScheduled.Id === undefined || this.roundTobeScheduled.Id === parseInt(RoundId)) {
            //Enable Schedule Button
            this.ifInterviewScheduled = false;
            this.ifInvalidInterview = this.isRejectedCandidate ? this.isRejectedCandidate : false;
            this.getNominatedInterviewersByRounds(RoundId);
            // this.NominatedInterviewers = new Array<MasterData>();
            // for (var index = 0; index < this.AllNominatedInterviewers.length; index++) {
            //     if (this.AllNominatedInterviewers[index].RoundNumber.Id === parseInt(RoundId)) {
            //         for (var i = 0; i < this.AllNominatedInterviewers[index].Interviewers.length; i++) {
            //             this.NominatedInterviewers.push(this.AllNominatedInterviewers[index].Interviewers[i]);
            //         }
            //     }
            // }
            // this.NominatedInterviewersAvailable = (this.NominatedInterviewers.length > 0) ? true : false;
            if (this.ScheduleInterView.InterviewID.Id !== null && this.ScheduleInterView.InterviewID.Id !== undefined) {
                var interviewerId: string[] = new Array();
                for (var index = 0; index < this.ScheduleInterView.InterviewerAvailability.length; index++) {
                    interviewerId.push((this.ScheduleInterView.InterviewerAvailability[index].Interviewer.Id).toString());
                }

                $('#cmbInterviewers').select2('val', interviewerId);
            } else {
                let cmb: any = $('#cmbInterviewers');
                cmb.select2();
            }
        } else if (this.ScheduleInterView.Status !== null && this.ScheduleInterView.Status !== undefined &&
            this.ScheduleInterView.Status.toLowerCase() !== 'rejected') {
            let modl: any = $('#skippingRound');
            modl.modal({ 'backdrop': 'static' });
        } else if (this.ScheduleInterView.Status !== null && this.ScheduleInterView.Status !== undefined &&
            this.ScheduleInterView.Status.toLowerCase() === 'rejected') {
            this.toastr.warning('You can not schdule interview  of rejected candidate by skipping round');
            this.ScheduleInterView.Round = new MasterData();
        } else {
            this.toastr.warning('Somthing is missed..!');
            this.ScheduleInterView.Round = new MasterData();
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
        for (var index = 0; index < InterviewerIds.length; index++) {
            let i = _.findIndex(this.OtherInterviewers, { Id: parseInt(InterviewerIds[index]) });
            if (i >= 0) {
                var tmpInterviewer: Interviewers = new Interviewers();
                tmpInterviewer.InterviewerId = this.OtherInterviewers[i];
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
        var StartTime = e.event.start.format('hh:mm A');
        var EndTime = e.event.end.format('hh:mm A');
        let fromTimeLabel: string = e.event.title + ' From :' + StartTime + ' To ' + EndTime;
        let element: any = $(e.element);
        element.tooltip({
            title: fromTimeLabel
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
    //Format Time in "hh:mm" format
    formatTime(date: any) {
        var d = new Date(moment(date._i).local()),
            h = '' + d.getHours(),
            m = '' + d.getMinutes();
        return [h, m].join(':');
    }

    /**Check For Valid And Invalid Slots while scheduling interview */
    checkAvailability() {
        this.isAvailableSlot = this.isBookedSlot = this.showConfirmation = false;
        /**return false if there no Availability for selected interviewrs */
        if (this.InterviewerCalendarDetails === null) {
            return false;
        } else {
            if (this.InterviewerCalendarDetails.Resources === null || this.InterviewerCalendarDetails.Events === null) {
                return false;
            } else if (this.InterviewerCalendarDetails.Resources.length === 0 || this.InterviewerCalendarDetails.Events.length === 0)
                return false;
        }
        var Booked = this.InterviewerCalendarDetails.Resources[_.findIndex(this.InterviewerCalendarDetails.Resources,
            { title: 'Booked' })].id;

        var Available = this.InterviewerCalendarDetails.Resources[_.findIndex(this.InterviewerCalendarDetails.Resources,
            { title: 'Available' })].id;

        for (var index = 0; index < this.InterviewerCalendarDetails.Events.length; index++) {

            var InterviewersStartDt = new Date(moment(this.InterviewerCalendarDetails.Events[index].start).local());
            var givenStrtDate = new Date(moment(this.ScheduleInterView.InterviewDate + 'T'
                + this.ScheduleInterView.InterviewFromTime).local());

            var InterviewersEndDt = new Date(moment(this.InterviewerCalendarDetails.Events[index].end).local());
            var givenendDate = new Date(moment(this.ScheduleInterView.InterviewDate + 'T'
                + this.ScheduleInterView.InterviewToTime).local());

            if (givenStrtDate < givenendDate) {
                /**Enters only if valid dates */
                if (InterviewersStartDt <= givenStrtDate && InterviewersEndDt >= givenendDate) {
                    if (this.InterviewerCalendarDetails.Events[index].resourceId === Booked) {
                        /**Checking for booked Slots retruns false if slot is booked */
                        if (this.ScheduleInterView.InterviewID.Id !== undefined
                            && this.ScheduleInterView.InterviewID.Id !== this.InterviewerCalendarDetails.Events[index].InterviewID.Id) {
                            /*********Check Following condition in Re-scheduling Case*/
                            //TODO : this.ScheduleInterView.InterviewID.Id === this.InterviewerCalendarDetails.Events[index].InterviewID.Id
                            this.isBookedSlot = true;
                        }
                        return false;
                    } else if (this.InterviewerCalendarDetails.Events[index].resourceId === Available) {
                        /**Checking for available Slots retruns true if slot is available */
                        this.isAvailableSlot = true;
                        return true;
                    }
                } else if (InterviewersStartDt.getDate() === givenStrtDate.getDate()) {
                    if (this.InterviewerCalendarDetails.Events[index].resourceId === Booked) {
                        //Booked Time should not overlap
                        if ((InterviewersStartDt >= givenStrtDate && InterviewersStartDt >= givenendDate)
                            || (InterviewersEndDt <= givenendDate && InterviewersEndDt <= givenStrtDate)) {
                            /** checking for overlaping slots*/
                            this.showConfirmation = true;
                            return false;
                        } else return false;
                    } else { this.showConfirmation = true; return false; }
                }
            } else return false;
        }

        return true;
    }

    /**Change Status According to Interview Schedule */
    changeStatus(status: string) {
        if (status !== null) {
            switch (status.toLowerCase()) {
                case '':
                case 'selected':
                case 'cancelled':
                    this.ScheduleInterView.Status = 'Scheduled';
                    break;
                case 'not scheduled':
                    this.ScheduleInterView.Status = 'Scheduled';
                    break;
                case 'scheduled':
                    this.ScheduleInterView.Status = 'Rescheduled';
                    break;
                case 'rescheduled':
                    this.ScheduleInterView.Status = 'Rescheduled';
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
        if (this.ScheduleInterView.InterviewMode.Value.toLowerCase().includes('skype')) {
            this.selectSkypeID = true;
        } else {
            this.selectSkypeID = false;
        }
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
        this.ScheduleInterView.Candidate = this.ScheduleInterView.Candidate ? this.ScheduleInterView.Candidate : 'No candidate available';
        //Set Value of Round By Interview Type
        if (this.ScheduleInterView.InterviewType.Id !== 0)
            this.getInterviewRoundsbyInterviewType(this.ScheduleInterView.InterviewType.Id.toString());

        //Change Date Format to yyyy-mm-dd
        this.ScheduleInterView.InterviewDate = this.formatDate(this.ScheduleInterView.InterviewDate);

        //this.clearSession('Candidate');
        this.ifRescheduleInterview = true;
        this.isInterviewReschedule = true;

        //Set selected Nominated Interviewers
        if (this.ScheduleInterView.Round.Id !== 0) {
            //this.getNominatedInterviewers();
            this.getNominatedInterviewersByRound(this.ScheduleInterView.Round.Id.toString());
        }
    }

    onClearSelection() {
        this.ScheduleInterView.Round = new MasterData();
        this.ifInterviewScheduled = true;
        this.ifInvalidInterview = false;
        let modl: any = $('#skippingRound');
        modl.modal('toggle');
    }

    onForceInterviewSchedule() {
        this.ifInvalidInterview = true;
        this.ifInterviewScheduled = false;
        let modl: any = $('#skippingRound');
        modl.modal('toggle');
    }

    /*---------------------------- MasterData Service Methods -----------------------------*/
    // Get All Interviewers from Service
    getOtherInterviewers() {
        this._mastersService.getInterviewers()
            .subscribe(
            results => {
                this.OtherInterviewers = <any>results;
                //  this.AllNominatedInterviewers = results;
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
    // Get All Skype Id from service
    getInterviewSkypeId() {
        this._mastersService.GetSkypeID()
            .subscribe(
            results => {
                this.InterviewSkypeId = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /** Get interview rounds*/
    getInterviewRounds(candidateID: string, rrfID: string) {
        this._mastersService.GetInterviewRounds(candidateID, rrfID)
            .subscribe(
            results => {
                this.CombinedInterviewRounds = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    /** Get interview rounds*/
    getInterviewRoundsIsRescheduled(candidateID: string, rrfID: string, interviewID: string) {

        this._mastersService.GetInterviewRoundsIsRescheduled(candidateID, rrfID, interviewID)
            .subscribe(
            results => {
                this.CombinedInterviewRounds = <any>results;
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
            (results: any) => {
                if (results.length !== undefined && results.length > 0) {
                    this.InterviewRounds = results;
                    this.roundTobeScheduled = results[0];
                }
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
        } else {
            this.event.end = start.format();
        }

        this.event.startTime = this.formatTime(start);
        this.event.endTime = this.formatTime(end);
        this.event.resourceId = e.calEvent.resourceId;
        this.event.id = e.calEvent.id;
        this.event.start = start.format();

        var i = _.findIndex(this.InterviewerCalendarDetails.Resources, { id: this.event.resourceId });
        if (i >= 0)
            this.event.Resource = this.InterviewerCalendarDetails.Resources[i].title;
        // this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
        console.log(this.event);

        this.cd.detectChanges();
        let modalPopup: any = $('#fullCalModal');
        modalPopup.modal();
        console.log(this.event);
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
