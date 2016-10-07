import { Component, OnInit} from '@angular/core';
import { } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RecruiterScheduleInterviewService} from '../services/displayScheduleInterviews.service';
import { InterviewsList} from '../model/interviewDetails';
import { GrdOptions } from  '../../../shared/model/index';
import { AllScheduleInterviewPipe } from  '../filter/scheduleInterviews.pipe';

@Component({
    moduleId: module.id,
    selector: 'show-schedule-interviews-recruiter',
    templateUrl: 'scheduleInterviews.component.html',
    //directives: [ROUTER_DIRECTIVES],
    //pipes: [AllScheduleInterviewPipe]
    providers:[RecruiterScheduleInterviewService,ToastsManager]
})

export class ScheduleInterviewsForRecruitersComponent implements OnInit {
    currentView: string = 'myInterviews';
    NORECORDSFOUND: boolean = false;
    mode: string;
    errorMessage: string;
    InterviewDetailsList: InterviewsList = new InterviewsList();
    constructor(private _recruitersInterviewService: RecruiterScheduleInterviewService,
        private toastr: ToastsManager) {
        this.currentView = 'myInterviews';
    }

    ngOnInit() {
        this.getMyScheduleInterviewsData();
    }
    onViewChanged(viewMode: string) {
        // this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.resetToDefaultGridOptions();
        this.InterviewDetailsList.GrdOperations.OrderBy = 'Modified';
        this.InterviewDetailsList.GrdOperations.Order = 'desc';
        this.InterviewDetailsList.GrdOperations.PerPageCount = 5;
        //Clear RRF List
        this.InterviewDetailsList = new InterviewsList();

        if (viewMode === 'allInterviews') {
            this.currentView = 'allInterviews';
            this.getAllScheduleInterviewsData();
        } else if (viewMode === 'myInterviews') {
            this.currentView = 'myInterviews';
            this.getMyScheduleInterviewsData();
        }
    }
    resetToDefaultGridOptions() {
        this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = [];
    }

    getAllScheduleInterviewsData() {
        this.NORECORDSFOUND = false;
        this._recruitersInterviewService.getAllInterviews(this.InterviewDetailsList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews !== null && results.AllInterviews.length > 0) {
                    this.InterviewDetailsList = results;

                } else {
                    this.InterviewDetailsList.AllInterviews = [];
                    this.InterviewDetailsList.GrdOperations = results.GrdOperations;
                    this.NORECORDSFOUND = true;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    getMyScheduleInterviewsData() {
        this.NORECORDSFOUND = false;
        this._recruitersInterviewService.getMyInterviews(this.InterviewDetailsList.GrdOperations)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews !== null && results.AllInterviews.length > 0) {
                    this.InterviewDetailsList = results;
                } else {
                    this.InterviewDetailsList.AllInterviews = [];
                    this.InterviewDetailsList.GrdOperations = results.GrdOperations;
                    this.NORECORDSFOUND = true;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    onChange() {
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = new Array<string>();
        this.checkViewMode();
    }
    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked 
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
           PerPageCount = No of items shown per page
                */
        this.InterviewDetailsList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.checkViewMode();
    }
    checkViewMode() {
        //Clear RRF List
        //this.InterviewDetailsList = new InterviewsList();

        if (this.currentView === 'allInterviews') {
            //this.currentView = 'allInterviews';
            this.getAllScheduleInterviewsData();
        } else if (this.currentView === 'myInterviews') {
            //this.currentView = 'myInterviews';
            this.getMyScheduleInterviewsData();
        }
    }
    //Format date in "yyyy-mm-dd" format
    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
}
