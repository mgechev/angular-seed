import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import { Interview} from '../../shared/model/interview';
import { InterviewersScheduleService} from '../services/interviewers.schedule.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MasterData } from  '../../../shared/model/index';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import { CalendarDetails} from '../../scheduleInterview/model/calendarDetails';
import { InterviewMode } from  '../../../shared/constantValue/index';
import { iefModel} from '../../shared/model/ief';
import { InterviewDetailsRowComponent } from '../../shared/component/InterviewDetailsRow/InterviewDetailsRow.component';
import { GrdOptions } from '../../../shared/model/common.model';
import { IEFGridRowComponent } from '../../shared/component/IEFGridRow/IEFGridRow.component';
import { MyScheduleInterview } from '../model/myScheduleInterview';


@Component({
    moduleId: module.id,
    selector: 'interviewers-shedule',
    templateUrl: 'interviewers.schedule.component.html',
    directives: [ROUTER_DIRECTIVES, FullCalendarComponent, InterviewDetailsRowComponent, IEFGridRowComponent],
    providers: [Interview, ToastsManager, InterviewersScheduleService]
})

export class RecruitmentInterviewScheduleComponent implements OnActivate {
    returnPath: string;
    Title: string;
    errorMessage: string;
    InterviewInformation: Array<Interview> = new Array<Interview>();
    InterviewInformationForCalendar: Array<Interview> = new Array<Interview>();
    interviewdd: Interview = new Interview();
    InterviewerCalendarDetails: CalendarDetails = new CalendarDetails();
    NORECORDSFOUND: boolean = false;
    HISTORYRECORDSNOTFOUND: boolean = false;
    currentDate: string;
    modeConstant: InterviewMode = InterviewMode;
    header: any = {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    };

    InterviewHistory: MyScheduleInterview[] = [];
    grdOptionsIntwHistory: GrdOptions = new GrdOptions();
    viewIEFText: string = 'View IEF';
    hideIEFText: string = 'Hide IEF';
    IEFButtonText: string = '';
    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _interviewService: InterviewersScheduleService) {
        this.InterviewInformation = new Array<Interview>();
        this.InterviewInformationForCalendar = new Array<Interview>();
        /**Commenting as this functionality is deprecated */
        // this.AwaitedInterviewInformation = new Array<Interview>();
        var date = new Date();
        this.currentDate = this.formatDate(date);
    }
    /**Router method overrid from OnActivate class */
    routerOnActivate() {
        this.getMyInterviews();
        this.InterviewerCalendarDetails.Events = <any>this._interviewService.getEvent();
        this.InterviewerCalendarDetails.Resources = <any>this._interviewService.getResources();

        this.getMyAllInterviewsDetailsOfCalendar();
        //this.returnPath = sessionStorage.getItem('returnPath');
        this.GetMyAllConductedInerviewsHistory();
        this.IEFButtonText = this.viewIEFText;
    }
    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    /**Get all interviews assigned and accepted by current logged in user from service. */
    getMyInterviews() {
        this._interviewService.getMyInterviews()
            .subscribe(
            (results: any) => {
                if (results.length !== undefined && results.length > 0) {
                    this.InterviewInformation = results;
                } else { this.NORECORDSFOUND = true; }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    DisableIEF(interviewDate: Date, interviewTime: Date) {
        if (moment(interviewDate).format('MM-DD-YYYY') >= moment(new Date()).format('MM-DD-YYYY')) {
            if (interviewTime.split(':')[0] >= new Date().getHours()) {
                if (interviewTime.split(':')[1] >= new Date().getMinutes()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    /**used for calender view */
    getMyAllInterviewsDetailsOfCalendar() {
        this._interviewService.getMyAllInterviewsDetailsOfCalendar()
            .subscribe(
            (results: any) => {
                this.InterviewerCalendarDetails = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    showIEF(
        _rrfId: MasterData,
        _candidateId: MasterData,
        _displayCandidateInfo: boolean,
        _interviewType: MasterData,
        _interviewId: MasterData,
        _interviewStatus: string
    ) {
        var _iefParameters: iefModel = new iefModel();
        _iefParameters.RRFID = _rrfId;
        _iefParameters.CandidateID = _candidateId;
        _iefParameters.DisplayCandidateInfo = _displayCandidateInfo;
        _iefParameters.InterviewType = _interviewType;
        _iefParameters.InterviewID = _interviewId;
        sessionStorage.setItem('SubmitIef', JSON.stringify(_iefParameters));
        sessionStorage.setItem('onReturnPath', '/App/Recruitment Cycle/Interviewers/schedule');
        sessionStorage.setItem('InterviewStatus', _interviewStatus);
        this._router.navigate(['/App/Recruitment Cycle/Interviewers/ief']);
    }

    //Shows Tooltip on calendar
    showDetails(e: any) {
        var StartTime = e.event.start._i.split('T')[1];
        var EndTime = e.event.end._i.split('T')[1];
        let element: any = $(e.element);
        element.tooltip({
            title: ':' + e.event.title
        });
    }

    GetMyAllConductedInerviewsHistory() {
        this._interviewService.GetMyAllConductedInerviews(this.grdOptionsIntwHistory)
            .subscribe(
            (results: any) => {
                this.grdOptionsIntwHistory = results.GrdOperations;
                if (results.AllInterviews !== undefined && results.AllInterviews.length > 0) {
                    this.InterviewHistory = results.AllInterviews;
                    for (var index = 0; index < this.InterviewHistory.length; index++) {
                        this.InterviewHistory[index].showIEF = false;
                        this.InterviewHistory[index].IEFButtonText = this.viewIEFText;
                    }
                    this.HISTORYRECORDSNOTFOUND = false;
                } else {
                    this.HISTORYRECORDSNOTFOUND = true;
                    this.InterviewHistory = [];
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    onIEFClick(myScheduleInterview: MyScheduleInterview) {
        myScheduleInterview.showIEF = !myScheduleInterview.showIEF;
        this.setIEFButtonText(myScheduleInterview);
    }

    setIEFButtonText(myScheduleInterview: MyScheduleInterview) {
        if (myScheduleInterview.showIEF) {
            myScheduleInterview.IEFButtonText = this.hideIEFText;
        } else {
            myScheduleInterview.IEFButtonText = this.viewIEFText;
        }
    }

    OnPaginationClick(pageClicked: number) {
        this.grdOptionsIntwHistory.ButtonClicked = pageClicked;
        this.GetMyAllConductedInerviewsHistory();
    }

    bindGridData() {
        this.grdOptionsIntwHistory.NextPageUrl = [];
        this.grdOptionsIntwHistory.ButtonClicked = 0;
        this.GetMyAllConductedInerviewsHistory();
    }
    /**Commenting as this functionality is deprecated */
    // rejectInterview(_rrfID: MasterData) {
    //     let modalpopup: any = $('#rejectInterview');
    //     modalpopup.modal();
    // }

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

    showSubmitIEF(status: string) {
        if (status.toLowerCase() === 'on hold') {
            return false;
        } else {
            return true;
        }
    }
}
